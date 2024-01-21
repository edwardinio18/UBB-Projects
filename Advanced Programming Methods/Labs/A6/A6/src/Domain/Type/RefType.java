package Domain.Type;

import Domain.Value.IValue;
import Domain.Value.RefValue;

// Interface for the Types
public class RefType implements IType {
	private final IType inner;

	public RefType(IType inner) {
		this.inner = inner;
	}

	public IType getInner() {
		return this.inner;
	}

	@Override
	public boolean equals(IType another) {
		if (another instanceof RefType)
			return inner.equals(((RefType) another).getInner());

		return false;
	}

	@Override
	public String toString() {
		return String.format("Ref(%s)", inner);
	}

	@Override
	public IValue defaultValue() {
		return new RefValue(0, inner);
	}
}