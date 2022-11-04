package Domain.Type;

import Domain.Value.IValue;
import Domain.Value.IntValue;

public class IntType implements IType {
	@Override
	public boolean equals(IType ant1) {
		return ant1 instanceof IntType;
	}

	@Override
	public IValue defaultValue() {
		return new IntValue(0);
	}

	@Override
	public IType deepCopy() {
		return new IntType();
	}

	@Override
	public String toString() {
		return "int";
	}
}