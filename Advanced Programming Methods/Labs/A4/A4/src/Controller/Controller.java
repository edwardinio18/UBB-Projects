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
	IRepository repository;
	boolean displayFlag = false;

	public void setDisplayFlag(boolean IValue) {
		this.displayFlag = IValue;
	}

	public Controller(IRepository repository) {
		this.repository = repository;
	}

	public ProgramState oneStep(ProgramState state) throws StatementException, ADTException, ExpressionException {
		IStack<IStmt> stack = state.getExeStack();
		if (stack.isEmpty())
			throw new StatementException("Program state stack is empty.");
		IStmt currentStatement = stack.pop();
		state.setExeStack(stack);
		return currentStatement.execute(state);
	}

	public void allSteps() throws ExpressionException, ADTException, StatementException, IOException {
		ProgramState program = this.repository.getCurrentState();
		this.repository.logPrgStateExec();
		display();
		while (!program.getExeStack().isEmpty()) {
			oneStep(program);
			this.repository.logPrgStateExec();
			display();
		}
	}

	private void display() {
		if (displayFlag) {
			System.out.println(this.repository.getCurrentState().toString());
		}
	}
}