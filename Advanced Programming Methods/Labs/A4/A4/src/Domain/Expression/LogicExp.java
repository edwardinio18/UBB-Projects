package Domain.Expression;


import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Type.BoolType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.BoolValue;
import Domain.Value.IValue;

import java.util.Objects;

public class LogicExp implements IExpression {
	IExpression expression1;
	IExpression expression2;
	String operation;

	public LogicExp(String operation, IExpression expression1, IExpression expression2) {
		this.expression1 = expression1;
		this.expression2 = expression2;
		this.operation = operation;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> symTable, IHeap heap) throws ExpressionException, ADTException {
		IValue value1, value2;
		value1 = this.expression1.eval(symTable, heap);
		if (value1.getType().equals(new BoolType())) {
			value2 = this.expression2.eval(symTable, heap);
			if (value2.getType().equals(new BoolType())) {
				BoolValue bool1 = (BoolValue) value1;
				BoolValue bool2 = (BoolValue) value2;
				boolean b1, b2;
				b1 = bool1.getValue();
				b2 = bool2.getValue();
				if (Objects.equals(this.operation, "and")) {
					return new BoolValue(b1 && b2);
				} else if (Objects.equals(this.operation, "or")) {
					return new BoolValue(b1 || b2);
				}
			} else {
				throw new ExpressionException("Second operand is not a boolean.");
			}
		} else {
			throw new ExpressionException("First operand is not a boolean.");
		}
		return null;
	}

	@Override
	public String toString() {
		return expression1.toString() + " " + operation + " " + expression2.toString();
	}
}