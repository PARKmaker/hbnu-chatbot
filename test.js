const context =
	"다중프로그래밍 환경에서 성능을 높이기 위하여 프로세스에게 CPU를 효율적으로 할당하는 과정을 CPU 스케줄링이라고 한다. 다중프로그래밍 운영체제의 기본요소 동시에 여러 프로그램을 메모리에 적재하고 CPU의 실행을 시분할 하여 각각의 프로세스에게 사용하게 하여 CPU의 이용률을 최대로 높인다. 프로세서 스케줄링의 목표는 멀티프로그래밍의 환경에서 CPU의 이용률의 최대화 하기 위한다.";

console.log(
	context.indexOf(
		"동시에 여러 프로그램을 메모리에 적재하고 CPU의 실행을 시분할 하여 각각의 프로세스에게 사용하게 하여 CPU의 이용률을 최대로 높인다"
	)
);
