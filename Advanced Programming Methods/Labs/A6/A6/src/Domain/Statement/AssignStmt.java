package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Value.IValue;

public class AssignStmt implements IStmt {
	private final String key;
	private final IExpression expression;

	public AssignStmt(String key, IExpression expression) {
		this.key = key;
		this.expression = expression;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IDictionary<String, IValue> symbolTable = state.getSymTable();

		if (symbolTable.isDefined(key)) {
			IValue value = expression.eval(symbolTable, state.getHeap());
			IType typeId = (symbolTable.lookUp(key)).getType();
			if (value.getType().equals(typeId)) {
				symbolTable.update(key, value);
			} else {
				throw new StatementException("Declared type of variable " + key + " and type of the assigned expression do not match.");
			}
		} else {
			throw new StatementException("The used variable " + key + " was not declared before.");
		}
		state.setSymTable(symbolTable);
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		IType typeVar = typeEnv.lookUp(key);
		IType typeExpr = expression.typeCheck(typeEnv);
		if (typeVar.equals(typeExpr))
			return typeEnv;
		else
			throw new StatementException("Assignment: right hand side and left hand side have different types.");
	}

	@Override
	public IStmt deepCopy() {
		return new AssignStmt(key, expression.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("%s = %s", key, expression.toString());
	}
}