package Domain.Expression;


import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Type.BoolType;
import Domain.Type.IntType;
import Domain.Type.IType;
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
	public IType typeCheck(IDictionary<String, IType> typeEnv) throws ExpressionException, ADTException {
		IType type1, type2;
		type1 = expression1.typeCheck(typeEnv);
		type2 = expression2.typeCheck(typeEnv);
		if (type1.equals(new BoolType())) {
			if (type2.equals(new BoolType())) {
				return new BoolType();
			} else
				throw new ExpressionException("Second operand is not a boolean.");
		} else
			throw new ExpressionException("First operand is not a boolean.");

	}

	@Override
	public IValue eval(IDictionary<String, IValue> table, IHeap heap) throws ExpressionException, ADTException {
		IValue value1, value2;
		value1 = this.expression1.eval(table, heap);
		if (value1.getType().equals(new BoolType())) {
			value2 = this.expression2.eval(table, heap);
			if (value2.getType().equals(new BoolType())) {
				BoolValue bool1 = (BoolValue) value1;
				BoolValue bool2 = (BoolValue) value2;
				boolean b1, b2;
				b1 = bool1.getVal();
				b2 = bool2.getVal();
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
	public IExpression deepCopy() {
		return new LogicExp(operation, expression1.deepCopy(), expression2.deepCopy());
	}

	@Override
	public String toString() {
		return expression1.toString() + " " + operation + " " + expression2.toString();
	}
}