package Domain.Statement;

import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Exceptions.ADTException;

import Domain.ProgramState.ProgramState;

import Domain.Expression.IExpression;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Value.IValue;

public class AssignStmt implements IStmt {
	private final String id;
	private final IExpression exp;

	public AssignStmt(String id, IExpression exp) {
		this.id = id;
		this.exp = exp;
	}

	@Override
	public String toString() {
		return this.id + " = " + this.exp.toString();
		// example: a = 5 + 2
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ADTException, ExpressionException {
		IDictionary<String, IValue> symTbl = state.getSymTable();

		if (symTbl.isDefined(id)) { // if the symbol table contains the id
			IValue val = exp.eval(symTbl);
			IType typId = (symTbl.lookUp(id)).getType();

			if (val.getType().equals(typId)) // value = type of the id
				symTbl.update(id, val);
			else
				throw new StatementException("Declared type of variable " + id + " and type of the assigned expression do not match.");
		} else
			throw new StatementException("The used variable " + id + " was not declared before.");

		state.setSymTable(symTbl);
		return state;
	}

}