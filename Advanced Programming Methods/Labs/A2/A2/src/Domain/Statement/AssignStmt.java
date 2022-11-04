package Domain.Statement;

import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IStack;
import Domain.Value.IValue;
import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;

public class AssignStmt implements IStmt {
	private final String key;
	private final IExpression exp;

	public AssignStmt(String key, IExpression exp) {
		this.key = key;
		this.exp = exp;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IDictionary<String, IValue> symTable = state.getSymTable();
		if (symTable.isDefined(this.key)) {
			IValue val = this.exp.eval(symTable);
			IType typID = (symTable.lookUp(this.key)).getType();
			if (val.getType().equals(typID)) {
				symTable.update(this.key, val);
			} else {
				throw new StatementException("Declared type of variable " + this.key + " and type of the assigned expression do not match");
			}
		} else {
			throw new StatementException("The used variable " + this.key + " was not declared before");
		}
		state.setSymTbl(symTable);
		return state;
	}

	@Override
	public IStmt deepCopy() {
		return new AssignStmt(this.key, this.exp.deepCopy());
	}

	@Override
	public String toString(){
		return String.format("%s = %s", this.key, this.exp.toString());
	}
}