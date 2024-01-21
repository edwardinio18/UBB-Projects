package Domain.Expression;

import Exceptions.ExpressionException;
import Exceptions.ADTException;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;
import Domain.Value.RefValue;

// Class that represents the ReadHeap expression
public class ReadHeapExp implements IExpression {
	private final IExpression expression;

	public ReadHeapExp(IExpression expression) {
		this.expression = expression;
	}
	@Override
	public IValue eval(IDictionary<String, IValue> symTable, IHeap heap) throws ExpressionException, ADTException {
		IValue value = expression.eval(symTable, heap);

		if (value instanceof RefValue) {
			RefValue refValue = (RefValue) value;

			if (heap.containsKey(refValue.getAddress()))
				return heap.get(refValue.getAddress());
			else
				throw new ExpressionException("The address is not defined on the heap!");
		} else
			throw new ExpressionException(String.format("%s not of RefType", value));
	}

	@Override
	public String toString() {
		return String.format("ReadHeap(%s)", expression);
	}
}