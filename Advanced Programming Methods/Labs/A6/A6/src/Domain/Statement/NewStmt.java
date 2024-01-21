package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Type.RefType;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.RefValue;
import Domain.Value.IValue;

public class NewStmt implements IStmt {
	private final String varName;
	private final IExpression expression;

	public NewStmt(String varName, IExpression expression) {
		this.varName = varName;
		this.expression = expression;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IDictionary<String, IValue> symTable = state.getSymTable();
		IHeap heap = state.getHeap();
		if (symTable.isDefined(varName)) {
			IValue varValue = symTable.lookUp(varName);
			if ((varValue.getType() instanceof RefType)) {
				IValue evaluated = expression.eval(symTable, heap);
				IType locationType = ((RefValue) varValue).getLocationType();
				if (locationType.equals(evaluated.getType())) {
					int newPosition = heap.add(evaluated);
					symTable.put(varName, new RefValue(newPosition, locationType));
					state.setSymTable(symTable);
					state.setHeap(heap);
				} else
					throw new StatementException(String.format("%s not of %s", varName, evaluated.getType()));
			} else {
				throw new StatementException(String.format("%s in not of RefType", varName));
			}
		} else {
			throw new StatementException(String.format("%s not in symTable", varName));
		}
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		IType typeVar = typeEnv.lookUp(varName);
		IType typeExpr = expression.typeCheck(typeEnv);
		if (typeVar.equals(new RefType(typeExpr)))
			return typeEnv;
		else
			throw new StatementException("NEW statement: right hand side and left hand side have different types.");
	}

	@Override
	public IStmt deepCopy() {
		return new NewStmt(varName, expression.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("New(%s, %s)", varName, expression);
	}
}