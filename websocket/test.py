import QuestionAnswering as qa
#import DocumentSearch as ds
question = '1976년 현대산업개발에서 건설한 아파트단지 이름은?'
paragraph = '압구정 현대아파트는 1976년 현대산업개발에서 건설한 아파트단지이다. 강남개발이 진행되면서 강남구는 인구가 집중되면서 주거시설이 늘고 도시가 팽창하기 시작했다. 지금은 ‘강남’이라고 불리는 영동지구를 중심으로 도시 성장과 변화의 물결이 한강변을 따라 퍼져나갔다.'
#n_best_size = 20
model = qa.Model()

answer = model.getAnswer(question, paragraph)
print(answer)
#search = ds.DocumentSearch()
#document = search.search_keyword('챗봇')
#document.save_document(document.sections)
