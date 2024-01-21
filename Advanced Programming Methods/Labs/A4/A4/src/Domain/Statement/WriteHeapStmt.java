package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.RefValue;
import Domain.Value.IValue;

public class WriteHeapStmt implements IStmt {
	private final String varName;
	private final IExpression expression;

	public WriteHeapStmt(String varName, IExpression expression) {
		this.varName = varName;
		this.expression = expression;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IDictionary<String, IValue> symTable = state.getSymTable();
		IHeap heap = state.getHeap();
		if (!symTable.isDefined(varName))
			throw new StatementException(String.format("%s not present in the symTable", varName));
		IValue value = symTable.lookUp(varName);
		if (!(value instanceof RefValue))
			throw new StatementException(String.format("%s not of RefType", value));
		RefValue refValue = (RefValue) value;
		IValue evaluated = expression.eval(symTable, heap);
		if (!evaluated.getType().equals(refValue.getLocationType()))
			throw new StatementException(String.format("%s not of %s", evaluated, refValue.getLocationType()));
		heap.update(refValue.getAddress(), evaluated);
		state.setHeap(heap);
		return state;
	}

	@Override
	public String toString() {
		return String.format("WriteHeap(%s, %s)", varName, expression);
	}
}