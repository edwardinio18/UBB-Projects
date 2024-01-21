package Domain.Expression;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Type.RefType;
import Domain.Type.IType;
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
	public IType typeCheck(IDictionary<String, IType> typeEnv) throws ExpressionException, ADTException {
		IType type = expression.typeCheck(typeEnv);
		if (type instanceof RefType) {
			RefType refType = (RefType) type;
			return refType.getInner();
		} else
			throw new ExpressionException("The rH argument is not a RefType.");
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
	public IExpression deepCopy() {
		return new ReadHeapExp(expression.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("ReadHeap(%s)", expression);
	}
}