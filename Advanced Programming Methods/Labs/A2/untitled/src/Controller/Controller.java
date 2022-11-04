package Controller;

import Domain.ProgramState.ProgramState;
import Domain.Statement.IStmt;
import Domain.Utilities.IStack;
import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Repository.IRepository;

public class Controller {
	IRepository repo;
	boolean displayFlag = false;

	public Controller(IRepository repo) {
		this.repo = repo;
	}

	public void setDisplayFlag(boolean value) {
		this.displayFlag = value;
	}

	public ProgramState oneStep(ProgramState state) throws StatementException, ADTException, ExpressionException {
		IStack<IStmt> stack = state.getExeStack();

		if (stack.isEmpty()) {
			throw new StatementException("Program state stack is empty");
		}
		IStmt currentStmt = stack.pop();
		state.setExeStack(stack);

		return currentStmt.execute(state);
	}

	public void allSteps() throws StatementException, ADTException, ExpressionException {
		ProgramState program = this.repo.getCurrentState();

		this.display();
		while (!program.getExeStack().isEmpty()) {
			oneStep(program);
			this.display();
		}
	}

	private void display() {
		if (this.displayFlag) {
			System.out.println(this.repo.getCurrentState().toString());
		}
	}
}