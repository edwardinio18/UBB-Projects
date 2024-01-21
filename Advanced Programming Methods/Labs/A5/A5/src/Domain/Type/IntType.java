package Domain.Type;

import Domain.Value.IntValue;

import Domain.Value.IValue;

// Class for the type of the integer values
public class IntType implements IType {

	@Override
	public boolean equals(IType another) {
		if (another instanceof IntType)
			return true;

		return false;
	}

	@Override
	public String toString() {
		return "int";
	}

	@Override
	public IValue defaultValue() {
		return new IntValue(0);
	}
}