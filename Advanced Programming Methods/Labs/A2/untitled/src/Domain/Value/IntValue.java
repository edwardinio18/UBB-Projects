package Domain.Value;

import Domain.Type.IType;
import Domain.Type.IntType;

public class IntValue implements IValue {
	private final int val;
	public IntValue(int val) {
		this.val = val;
	}

	public String toString() {
		return "val = " + this.val;
	}

	@Override
	public boolean equals(Object anv1) {
		if (!(anv1 instanceof IntValue castVal)) {
			return false;
		}
		return this.val == castVal.val;
	}

	public IType getType() {
		return new IntType();
	}

	public int getValue() {
		return this.val;
	}

	public IValue deepCopy() {
		return new IntValue(this.val);
	}
}