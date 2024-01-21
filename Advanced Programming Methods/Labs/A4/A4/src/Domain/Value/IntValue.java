package Domain.Value;

import Domain.Type.IntType;
import Domain.Type.IType;

public class IntValue implements IValue {
	private final int value;

	public IntValue(int value) {
		this.value = value;
	}

	@Override
	public IType getType() {
		return new IntType();
	}

	@Override
	public boolean equals(Object anotherValue) {
		if (!(anotherValue instanceof IntValue))
			return false;
		IntValue castValue = (IntValue) anotherValue;
		return this.value == castValue.value;
	}

	@Override
	public IValue deepCopy() {
		return new IntValue(value);
	}

	public int getValue() {
		return this.value;
	}

	@Override
	public String toString() {
		return String.format("%d", this.value);
	}
}