package Controller;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.ProgramState.ProgramState;
import Domain.Statement.IStmt;
import Domain.Utilities.IStack;
import Repository.IRepository;

import java.io.IOException;

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

	public void allSteps() throws ADTException, StatementException, ExpressionException, IOException {
		ProgramState program = this.repo.getCurrentState();
		this.repo.logPrgStaExe();
		display();

		while(!program.getExeStack().isEmpty()) {
			oneStep(program);
			this.repo.logPrgStaExe();
			display();
		}
	}

	private void display() {
		if (displayFlag) {
			System.out.println(this.repo.getCurrentState().toString());
		}
	}

	public IRepository getRepo() {
		return repo;
	}

}