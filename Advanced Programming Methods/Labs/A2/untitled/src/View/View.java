package View;

import Controller.Controller;
import Domain.Expression.ArithExp;
import Domain.Expression.ValueExp;
import Domain.Expression.VarExp;
import Domain.ProgramState.ProgramState;
import Domain.Statement.*;
import Domain.Type.BoolType;
import Domain.Type.IntType;
import Domain.Utilities.*;
import Domain.Value.BoolValue;
import Domain.Value.IValue;
import Domain.Value.IntValue;
import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Repository.IRepository;
import Repository.Repository;
import com.sun.jdi.Value;

import java.io.IOException;
import java.util.Objects;
import java.util.Scanner;
import java.util.Stack;

public class View {
	public void start() {
		boolean done = false;

		while (!done) {
			try {
				printMenu();
				Scanner readOption = new Scanner(System.in);
				int option = readOption.nextInt();
				if (option == 0) {
					done = true;
				} else if (option == 1) {
					runProgram1();
				} else if (option == 2) {
					runProgram2();
				} else if (option == 3) {
					runProgram3();
				} else {
					System.out.println("Invalid input!");
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}
	}

	private static void printMenu(){
		System.out.println("MENU: ");
		System.out.println("0. Exit.");
		System.out.println("1. Run the first program: \n\tint v;v=2;Print(v)");
		System.out.println("2. Run the second program: \n\tint a;int b;a=2+3*5;b=a+1;Print(b)");
		System.out.println("3. Run the third program: \n\tbool a;int v;a=true;(If a Then v=2 Else v=3);Print(v)");
		System.out.println("Choose an option: ");
	}

	private void runProgram1() throws ExpressionException, ADTException, StatementException, IOException {
		IStmt ex1 = new CompStmt(new VarDeclStmt("v", new IntType()),
				new CompStmt(new AssignStmt("v", new ValueExp(new IntValue(2))),
						new PrintStmt(new VarExp("v"))));
		runStatement(ex1);
	}

	private void runProgram2() throws ExpressionException, ADTException, StatementException, IOException {
		IStmt ex2 = new CompStmt(new VarDeclStmt("a", new IntType()),
				new CompStmt(new VarDeclStmt("b",new IntType()),
						new CompStmt(new AssignStmt("a", new ArithExp('+',new ValueExp(new IntValue(2)),new
								ArithExp('*',new ValueExp(new IntValue(3)), new ValueExp(new IntValue(5))))),
								new CompStmt(new AssignStmt("b",new ArithExp('+',new VarExp("a"), new ValueExp(new
										IntValue(1)))), new PrintStmt(new VarExp("b"))))));
		runStatement(ex2);
	}

	private void runProgram3() throws ExpressionException, ADTException, StatementException, IOException {
		IStmt ex3 = new CompStmt(new VarDeclStmt("a", new BoolType()),
				new CompStmt(new VarDeclStmt("v", new IntType()),
						new CompStmt(new AssignStmt("a", new ValueExp(new BoolValue(false))),
								new CompStmt(new IfStmt(new VarExp("a"),
										new AssignStmt("v", new ValueExp(new IntValue(2))),
										new AssignStmt("v", new ValueExp(new IntValue(3)))),
										new PrintStmt(new VarExp("v"))))));
		runStatement(ex3);
	}

	private void runStatement(IStmt statement) throws ExpressionException, ADTException, StatementException, IOException {
		IStack<IStmt> executionStack = new MyStack<>();
		IDictionary<String, IValue> symbolTable = new MyDictionary<>();
		IList<IValue> output = new MyList<>();

		ProgramState state = new ProgramState(executionStack, symbolTable, output, statement);

		IRepository repository = new Repository(state);
		Controller controller = new Controller(repository);

		System.out.println("Do you want to display the steps?[Y/n]");
		Scanner readOption = new Scanner(System.in);
		String option = readOption.next();
		controller.setDisplayFlag(Objects.equals(option, "Y"));

		controller.allSteps();
		System.out.println("Result is" + state.getOut().toString().replace('[', ' ').replace(']', ' '));
	}
}