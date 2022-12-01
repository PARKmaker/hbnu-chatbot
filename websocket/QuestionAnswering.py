import os
from ratsnlp.nlpbook.qa import QADeployArguments
import torch
import pdfplumber
from QuestionAnalyzer import QuestionAnalyzer
from transformers import BertConfig, BertForQuestionAnswering, BertTokenizer
from DocumentSearch import DocumentSearch, Document

workspace = 'C:/Users/PARKmaker/Desktop/AnyWhere/hbnu-chatbot/websocket'
pdf_dir = 'pdf'
BERT_model_dir = os.path.join(workspace, 'model/BERT_multi')
kcBERT_model_dir = os.path.join(workspace, 'model/kcBERT')
max_seq_len = 512
max_query_len = 32


class Model():
    def __init__(self):
        self.args = QADeployArguments(
            pretrained_model_name="bert-base-multilingual-cased",
            downstream_model_dir=BERT_model_dir,
            max_seq_length=max_seq_len,
            max_query_length=max_query_len,
        )
        fine_tuned_model_ckpt = torch.load(
            self.args.downstream_model_checkpoint_fpath,
            map_location=torch.device("cpu")
        )
        pretrained_model_config = BertConfig.from_pretrained(
            self.args.pretrained_model_name,
        )
        self.model = BertForQuestionAnswering(pretrained_model_config)
        self.model.load_state_dict({k.replace(
            "model.", ""): v for k, v in fine_tuned_model_ckpt['state_dict'].items()})
        self.model.eval()
        self.question_analyzer = QuestionAnalyzer()
        self.document_search = DocumentSearch()
        self.tokenizer = BertTokenizer.from_pretrained(
            self.args.pretrained_model_name,
            do_lower_case=False,
        )

    def wikiMrc(self, question):
        keywords = self.question_analyzer.getKeyword(question)
        save_path = self.document_search.save_path
        search_file_list = []
        for keyword in keywords:
            keyword_path = os.path.join(save_path, keyword)
            if not os.path.isdir(keyword_path):
                document = self.document_search.search_keyword(keyword)
                document.save_document(document.sections)
            search_file_list += [os.path.join(
                keyword_path, file_name) for file_name in os.listdir(keyword_path)]
        for file in search_file_list:
            f = open(file, 'r', encoding="utf-8")
            try:
                lines = f.readlines()
            except:
                f.close()
                f = open(file, 'r', encoding="cp949")
                lines = f.readlines()
            for line in lines:
                answer = self.getAnswer(question, line)
                if not answer['answer'] == '[CLS]':
                    return answer['answer']
            f.close()
        return '모르겠어요.'

    def fileMrc(self, question, file_name):
        file_path = os.path.join(pdf_dir, file_name)
        with pdfplumber.open(file_path) as temp:
            for page in temp.pages:
                answer = self.getAnswer(
                    question, page.extract_text().replace('\n', ''))
                if not answer['answer'] == '[CLS]':
                    return answer['answer']
        return '모르겠어요.'

    def getContextSplitSize(self, context_tokens, split_num=1):
        while(True):
            if len(context_tokens) / split_num > 512:
                split_num += 1
            else:
                break
        return split_num

    def getAnswer(self, question, context):
        context_tokens = self.tokenizer.tokenize(context)
        split_len = self.getContextSplitSize(context, split_num=1)
        context_backup = context
        context_list = [context[i:i+split_len * 1024]
                        for i in range(0, len(context), split_len * 1024)]
        answer = ''
        print(context_list)
        truncated_query = self.tokenizer.encode(
            question,
            add_special_tokens=False,
            truncation=True,
            max_length=self.args.max_query_length
        )
        for context in context_list:
            print(context)
            if context:
                inputs = self.tokenizer.encode_plus(
                    text=truncated_query,
                    text_pair=context,
                    truncation="only_second",
                    padding="max_length",
                    max_length=self.args.max_seq_length,
                    return_token_type_ids=True,
                )
                with torch.no_grad():
                    outputs = self.model(
                        **{k: torch.tensor([v]) for k, v in inputs.items()})
                    start_pred = outputs.start_logits.argmax(dim=-1).item()
                    end_pred = outputs.end_logits.argmax(dim=-1).item()
                    pred_text = self.tokenizer.decode(
                        inputs['input_ids'][start_pred:end_pred+1])
            else:
                pred_text = ""
            if pred_text != '[CLS]':
                return {
                    'question': question,
                    'context': context,
                    'answer': pred_text,
                }
        return {
            'question': question,
            'context': context_backup,
            'answer': '[CLS]',
        }
