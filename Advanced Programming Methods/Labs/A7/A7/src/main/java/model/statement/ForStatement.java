package model.statement;

import exceptions.InterpreterException;
import model.expression.IExpression;
import model.expression.RelationalExpression;
import model.expression.VariableExpression;
import model.programState.ProgramState;
import model.type.IntType;
import model.type.Type;
import model.utils.MyIDictionary;
import model.utils.MyIStack;

public class ForStatement implements IStatement {
	private String varName;
	private IExpression exp1;
	private IExpression exp2;
	private IExpression exp3;
	private IStatement stmt;

	public ForStatement(String varName, IExpression exp1, IExpression exp2, IExpression exp3, IStatement stmt) {
		this.varName = varName;
		this.exp1 = exp1;
		this.exp2 = exp2;
		this.exp3 = exp3;
		this.stmt = stmt;
	}

	@Override
	public ProgramState execute(ProgramState state) throws InterpreterException {
		MyIStack<IStatement> stack = state.getExeStack();
		stack.push(new CompoundStatement(new AssignStatement(varName, exp1),
				new WhileStatement(new RelationalExpression("<", new VariableExpression(varName), exp2),
						new CompoundStatement(stmt, new AssignStatement(varName, exp3)))));
		return null;
	}

	@Override
	public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnv) throws InterpreterException {
		Type typeVar = typeEnv.lookUp(varName);
		Type typeExp1 = exp1.typeCheck(typeEnv);
		Type typeExp2 = exp2.typeCheck(typeEnv);
		Type typeExp3 = exp3.typeCheck(typeEnv);
		if (typeVar.equals(new IntType())) {
			if (typeExp1.equals(new IntType())) {
				if (typeExp2.equals(new IntType())) {
					if (typeExp3.equals(new IntType())) {
						stmt.typeCheck(typeEnv.deepCopy());
						return typeEnv;
					} else
						throw new InterpreterException("The 3rd expression of FOR does not have the type int.");
				} else
					throw new InterpreterException("The 2nd expression of FOR does not have the type int.");
			} else
				throw new InterpreterException("The 1st expression of FOR does not have the type int.");
		} else
			throw new InterpreterException("The variable of FOR does not have the type int.");
	}

	@Override
	public IStatement deepCopy() {
		return new ForStatement(varName, exp1, exp2, exp3, stmt);
	}

	@Override
	public String toString() {
		return "for(" + varName + "=" + exp1.toString() + ";" + varName + "<" + exp2.toString() + ";" + varName + "="
				+ exp3.toString() + ")" + stmt.toString();
	}
}