package Domain.Value;

import Domain.Type.IType;
import Domain.Type.BoolType;

public class BoolValue implements IValue {
	boolean val;
	public BoolValue(boolean v) {
		this.val = v;
	}

	public String toString() {
		return "val = " + this.val;
	}

	public IType getType() {
		return new BoolType();
	}

	@Override
	public boolean equals(Object anv1) {
		if (!(anv1 instanceof BoolValue castVal)) {
			return false;
		}
		return this.val == castVal.val;
	}

	public boolean getValue() {
		return this.val;
	}

	public IValue deepCopy() {
		return new BoolValue(this.val);
	}
}