package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.ProgramState.ProgramState;
import Domain.Type.IType;
import Domain.Utilities.MyDictionary;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IStack;
import Domain.Utilities.MyStack;
import Domain.Value.IValue;

import java.util.Map;

public class ForkStmt implements IStmt {
	private final IStmt statement;

	public ForkStmt(IStmt statement) {
		this.statement = statement;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IStack<IStmt> newStack = new MyStack<>();
		newStack.push(statement);
		IDictionary<String, IValue> newSymTable = new MyDictionary<>();
		for (Map.Entry<String, IValue> entry : state.getSymTable().getContent().entrySet()) {
			newSymTable.put(entry.getKey(), entry.getValue().deepCopy());
		}

		return new ProgramState(newStack, newSymTable, state.getOut(), state.getFileTable(), state.getHeap());
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		statement.typeCheck(typeEnv.deepCopy());
		return typeEnv;
	}

	@Override
	public IStmt deepCopy() {
		return new ForkStmt(statement.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("Fork(%s)", statement.toString());
	}
}