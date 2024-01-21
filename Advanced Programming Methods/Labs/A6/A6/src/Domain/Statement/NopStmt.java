package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.ProgramState.ProgramState;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;

public class NopStmt implements IStmt {
	@Override
	public ProgramState execute(ProgramState state) {
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		return typeEnv;
	}

	@Override
	public IStmt deepCopy() {
		return new NopStmt();
	}

	@Override
	public String toString() {
		return "NopStatement";
	}
}