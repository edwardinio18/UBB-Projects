package Domain.Type;

import Domain.Value.IntValue;

import Domain.Value.IValue;

public class IntType implements IType {

	@Override
	public boolean equals(IType another) {
		return another instanceof IntType;
	}

	@Override
	public String toString() {
		return "int";
	}

	@Override
	public IntValue defaultValue() {
		return new IntValue(0);
	}
}