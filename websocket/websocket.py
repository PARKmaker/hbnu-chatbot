import asyncio
import QuestionAnswering as qa
import json
import websockets
import psutil


def scheduling(question_scheduling_list):
    scheduling_list_size = len(question_scheduling_list)
    model_id = 0
    quequed_question_cnt = question_scheduling_list[model_id]
    for i in range(1, scheduling_list_size):
        if quequed_question_cnt > question_scheduling_list[i]:
            model_id = i
            quequed_question_cnt = question_scheduling_list[i]
    question_scheduling_list[i] += 1
    return model_id


model_size = (1024 ** 2) * 711  # MB
memory = psutil.virtual_memory()

available = memory.available * 0.5
model_num = int(available // model_size)

model_list = [qa.Model() for i in range(0, model_num)]
question_scheduling_list = [0] * model_num
print(model_num, 'chatbots activated')


async def accept(websocket, path):
    print('Client connected')
    while True:
        data = await websocket.recv()
        model_id = scheduling(question_scheduling_list)
        model = model_list[model_id]
        print(data)
        text = json.loads(data)
        question = text['question']
        if text.get('file') is not None:
            file_name = text['file']
            print("receive : " + question)
            print("file_name : " + file_name)
            answer = model.fileMrc(question, file_name)
        else:
            answer = model.wikiMrc(question)

        question_scheduling_list[model_id] -= 1
        await websocket.send(answer)

start_server = websockets.serve(accept, "localhost", 9998)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
