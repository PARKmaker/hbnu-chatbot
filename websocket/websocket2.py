import asyncio
import QuestionAnswering as qa
import json
import websockets

model = qa.Model()
print('ChatBot on..')


async def accept(websocket, path):
    print('Client connected')
    while True:
        data = await websocket.recv()
        text = json.loads(data)
        question = text['question']

        if text.get('file') is not None:
            file_name = text['file']
            print("receive : " + question)
            print("file_name : " + file_name)
            answer = model.fileMrc(question, file_name)
        else:
            answer = model.wikiMrc(question)

        await websocket.send(answer)

start_server = websockets.serve(accept, "localhost", 9998)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
