package Controller;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.ProgramState.ProgramState;
import Domain.Statement.IStmt;
import Domain.Utilities.IStack;
import Domain.Value.IValue;
import Domain.Value.RefValue;
import Repository.IRepository;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Controller {
	IRepository repo;
	boolean displayFlag = false;

	public Controller(IRepository repo) {
		this.repo = repo;
	}

	public void setDisplayFlag(boolean displayFlag) {
		this.displayFlag = displayFlag;
	}

	public ProgramState oneStep(ProgramState state) throws ADTException, StatementException, ExpressionException {
		IStack<IStmt> stack = state.getExeStack();

		if (stack.isEmpty())
			throw new StatementException("Execution stack is empty!");

		IStmt currentStatement = stack.pop();
		state.setExeStack(stack);
		return currentStatement.execute(state);
	}

	public Map<Integer, IValue> unsafeGarbageCollector(List<Integer> symTableAddr, Map<Integer, IValue> heap) {
		return heap.entrySet().stream().filter(e -> symTableAddr.contains(e.getKey())).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
	}

	public List<Integer> getAddrFromSymTable(Collection<IValue> symTableValues) {
		return symTableValues.stream().filter(v -> v instanceof RefValue).map(v -> {
			RefValue v1 = (RefValue) v;
			return v1.getAddress();
		}).collect(Collectors.toList());
	}

	public List<Integer> getAddrFromHeap(Collection<IValue> heapValues) {
		return heapValues.stream()
				.filter(v -> v instanceof RefValue)
				.map(v -> {
					RefValue v1 = (RefValue) v;
					return v1.getAddress();
				})
				.collect(Collectors.toList());
	}

	public Map<Integer, IValue> safeGarbageCollector(List<Integer> symTableAddr, List<Integer> heapAddr, Map<Integer, IValue> heap) {
		return heap.entrySet().stream()
				.filter(e -> (symTableAddr.contains(e.getKey()) || heapAddr.contains(e.getKey())))
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
	}


	public void allSteps() throws ADTException, StatementException, ExpressionException, IOException {
		ProgramState program = this.repo.getProgramList().get(0);
		this.repo.logPrgStateExec();
		display(program);

		while (!program.getExeStack().isEmpty()) {
			oneStep(program);
			program.getHeap().setContent((HashMap<Integer, IValue>) safeGarbageCollector(getAddrFromSymTable(program.getSymTable().values()), getAddrFromHeap(program.getHeap().getContent().values()), program.getHeap().getContent()));
			this.repo.logPrgStateExec();
			display(program);
		}
	}

	private void display(ProgramState programState) {
		if (displayFlag) {
			System.out.println(programState.toString());
		}
	}

	public IRepository getRepository() {
		return repo;
	}
}