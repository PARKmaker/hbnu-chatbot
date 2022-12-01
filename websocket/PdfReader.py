import pdfplumber
import QuestionAnswering as qa

model = qa.Model()
question = '사용자가 사람과 직접 말을 주고받는 것처럼 자연스러운 답변을 제공하는 역할을 담당하는 것은?'
with pdfplumber.open("pdf/RM 2018-11_챗봇(ChatBot) 활용 사례 및 이러닝 도입 전략.pdf") as temp:
  for page in temp.pages:
      answer = model.getAnswer(question, page.extract_text().replace('\n', ''))
      if not answer['answer'] == '[CLS]':
          print(answer)
          break
