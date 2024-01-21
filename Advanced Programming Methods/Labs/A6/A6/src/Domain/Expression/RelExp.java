package Domain.Expression;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Type.BoolType;
import Domain.Type.IntType;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.BoolValue;
import Domain.Value.IntValue;
import Domain.Value.IValue;

import java.util.Objects;

public class RelExp implements IExpression {
	IExpression expression1;
	IExpression expression2;
	String operator;

	public RelExp(String operator, IExpression expression1, IExpression expression2) {
		this.expression1 = expression1;
		this.expression2 = expression2;
		this.operator = operator;
	}

	@Override
	public IType typeCheck(IDictionary<String, IType> typeEnv) throws ExpressionException, ADTException {
		IType type1, type2;
		type1 = expression1.typeCheck(typeEnv);
		type2 = expression2.typeCheck(typeEnv);
		if (type1.equals(new IntType())) {
			if (type2.equals(new IntType())) {
				return new BoolType();
			} else
				throw new ExpressionException("Second operand is not an integer.");
		} else
			throw new ExpressionException("First operand is not an integer.");

	}

	@Override
	public IValue eval(IDictionary<String, IValue> table, IHeap heap) throws ExpressionException, ADTException {
		IValue value1, value2;
		value1 = this.expression1.eval(table, heap);
		if (value1.getType().equals(new IntType())) {
			value2 = this.expression2.eval(table, heap);
			if (value2.getType().equals(new IntType())) {
				IntValue val1 = (IntValue) value1;
				IntValue val2 = (IntValue) value2;
				int v1, v2;
				v1 = val1.getVal();
				v2 = val2.getVal();
				if (Objects.equals(this.operator, "<"))
					return new BoolValue(v1 < v2);
				else if (Objects.equals(this.operator, "<="))
					return new BoolValue(v1 <= v2);
				else if (Objects.equals(this.operator, "=="))
					return new BoolValue(v1 == v2);
				else if (Objects.equals(this.operator, "!="))
					return new BoolValue(v1 != v2);
				else if (Objects.equals(this.operator, ">"))
					return new BoolValue(v1 > v2);
				else if (Objects.equals(this.operator, ">="))
					return new BoolValue(v1 >= v2);
			} else
				throw new ExpressionException("Second operand is not an integer.");
		} else
			throw new ExpressionException("First operand in not an integer.");
		return null;
	}

	@Override
	public IExpression deepCopy() {
		return new RelExp(operator, expression1.deepCopy(), expression2.deepCopy());
	}

	@Override
	public String toString() {
		return this.expression1.toString() + " " + this.operator + " " + this.expression2.toString();
	}
}