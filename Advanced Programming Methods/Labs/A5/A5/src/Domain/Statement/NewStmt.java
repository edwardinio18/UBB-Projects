package Domain.Statement;

import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Exceptions.ADTException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Statement.IStmt;
import Domain.Type.IType;
import Domain.Type.RefType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;
import Domain.Value.RefValue;

// Class for the WriteHeap statement
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

		if (symTable.containsKey(varName)) {
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
	public String toString() {
		return String.format("New(%s, %s)", varName, expression);
	}
}