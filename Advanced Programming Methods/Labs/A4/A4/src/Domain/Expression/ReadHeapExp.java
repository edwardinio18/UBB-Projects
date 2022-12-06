package Domain.Expression;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.RefValue;
import Domain.Value.IValue;

public class ReadHeapExp implements IExpression {
	private final IExpression expression;

	public ReadHeapExp(IExpression expression) {
		this.expression = expression;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> symTable, IHeap heap) throws ExpressionException, ADTException {
		IValue value = expression.eval(symTable, heap);
		if (!(value instanceof RefValue))
			throw new ExpressionException(String.format("%s not of RefType", value));
		RefValue refValue = (RefValue) value;
		return heap.get(refValue.getAddress());
	}

	@Override
	public String toString() {
		return String.format("ReadHeap(%s)", expression);
	}
}