package Domain.Value;

import Domain.Type.IType;

// Interface for all values
public interface IValue {
	boolean equals(IValue another);

	IType getType();
}