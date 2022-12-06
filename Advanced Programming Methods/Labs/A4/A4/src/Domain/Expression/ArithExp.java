package Domain.Expression;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Type.IntType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IntValue;
import Domain.Value.IValue;

public class ArithExp implements IExpression {
	IExpression expression1;
	IExpression expression2;
	char operation;

	public ArithExp(char operation, IExpression expression1, IExpression expression2) {
		this.expression1 = expression1;
		this.expression2 = expression2;
		this.operation = operation;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> symTable, IHeap heap) throws ExpressionException, ADTException {
		IValue value1, value2;
		value1 = this.expression1.eval(symTable, heap);
		if (value1.getType().equals(new IntType())) {
			value2 = this.expression2.eval(symTable, heap);
			if (value2.getType().equals(new IntType())) {
				IntValue int1 = (IntValue) value1;
				IntValue int2 = (IntValue) value2;
				int n1, n2;
				n1 = int1.getValue();
				n2 = int2.getValue();
				if (this.operation == '+')
					return new IntValue(n1 + n2);
				else if (this.operation == '-')
					return new IntValue(n1 - n2);
				else if (this.operation == '*')
					return new IntValue(n1 * n2);
				else if (this.operation == '/')
					if (n2 == 0)
						throw new ExpressionException("Division by zero.");
					else
						return new IntValue(n1 / n2);
			} else
				throw new ExpressionException("Second operand is not an integer.");
		} else
			throw new ExpressionException("First operand is not an integer.");
		return null;
	}

	@Override
	public String toString() {
		return expression1.toString() + " " + operation + " " + expression2.toString();
	}
}