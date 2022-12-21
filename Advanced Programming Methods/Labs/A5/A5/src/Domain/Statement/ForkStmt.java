package Domain.Statement;

import Domain.Utilities.IDictionary;
import Domain.Utilities.IStack;
import Domain.Value.IValue;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Exceptions.ADTException;
import Domain.ProgramState.ProgramState;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IStack;
import Domain.Utilities.MyDictionary;
import Domain.Utilities.MyStack;
import Domain.Value.IValue;

import java.util.Map;

// Class that creates a new thread
public class ForkStmt implements IStmt {
	private final IStmt statement;

	public ForkStmt(IStmt statement) {
		this.statement = statement;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		// create a new stack and a new symbol table for the new thread
		IStack<IStmt> newStack = new MyStack<>();
		newStack.push(statement);
		IDictionary<String, IValue> newSymTable = new MyDictionary<>();

		for (Map.Entry<String, IValue> entry : state.getSymTable().getContent().entrySet()) {
			newSymTable.put(entry.getKey(), entry.getValue());
		}

		return new ProgramState(newStack, newSymTable, state.getOut(), state.getFileTable(), state.getHeap());
	}

	@Override
	public String toString() {
		return String.format("Fork(%s", statement.toString());
	}
}