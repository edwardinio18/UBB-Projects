package Domain.Type;

import Domain.Value.IValue;

// Interface for all Types
public interface IType {
	boolean equals(IType another);
	String toString();
	IValue defaultValue();
}