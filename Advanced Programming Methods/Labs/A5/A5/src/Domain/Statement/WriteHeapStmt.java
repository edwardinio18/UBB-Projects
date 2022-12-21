package Domain.Statement;

import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Exceptions.ADTException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Type.RefType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;
import Domain.Value.RefValue;

// WriteHeapStmt implements the IStatement interface, and it is used for writing a value in the heap at a given address.
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

		if (symTable.containsKey(varName)) {
			IValue value = symTable.lookUp(varName);

			if (value.getType() instanceof RefType) {
				RefValue refValue = (RefValue) value;

				if (heap.containsKey(refValue.getAddress())) {
					IValue evaluated = expression.eval(symTable, heap);

					if (evaluated.getType().equals(refValue.getLocationType())) {
						heap.update(refValue.getAddress(), evaluated);
						state.setHeap(heap);
					} else
						throw new StatementException(String.format("%s not of %s", evaluated, refValue.getLocationType()));
				} else
					throw new StatementException(String.format("The RefValue %s is not defined in the heap", value));
			} else
				throw new StatementException(String.format("%s not of RefType", value));
		} else
			throw new StatementException(String.format("%s not present in the symTable", varName));
		return null;
	}

	@Override
	public String toString() {
		return String.format("WriteHeap(%s, %s)", varName, expression);
	}
}