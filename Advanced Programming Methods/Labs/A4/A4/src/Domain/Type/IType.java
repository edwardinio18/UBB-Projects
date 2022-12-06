package Domain.Type;

import Domain.Value.IValue;

public interface IType {
	boolean equals(IType anotherType);
	IValue defaultValue();
	IType deepCopy();
}