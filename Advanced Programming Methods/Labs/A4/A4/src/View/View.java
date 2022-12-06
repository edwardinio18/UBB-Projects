package View;

import Controller.Controller;
import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.*;
import Domain.ProgramState.ProgramState;
import Domain.Statement.*;
import Domain.Type.*;
import Domain.Utilities.*;
import Domain.Value.*;
import Repository.*;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.util.Objects;
import java.util.Scanner;

public class View {
	public void start() {
		boolean done = false;
		while (!done) {
			try {
				showMenu();
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
			} catch (Exception exception) {
				System.out.println("\u001B[31m" + exception.getMessage() + "\u001B[0m");
			}
		}
	}

	private void showMenu() {
		System.out.println("MENU: ");
		System.out.println("0. Exit.");
		System.out.println("1. Run the first program: \n\tint v;\n\tv=2;\n\tPrint(v)");
		System.out.println("2. Run the second program: \n\tint a;\n\tint b;\n\ta=2+3*5;\n\tb=a+1;\n\tPrint(b)");
		System.out.println("3. Run the third program: \n\tbool a;\n\tint v;\n\ta=true;\n\t(If a Then v=2 Else v=3);\n\tPrint(v)");
		System.out.println("Choose an option: ");
	}

	private void runProgram1() throws ExpressionException, ADTException, StatementException, IOException {
		IStmt ex1 = new CompStmt(new VarDeclStmt("v", new IntType()),
				new CompStmt(new AssignStmt("v", new ValueExp(new IntValue(2))),
						new PrintStmt(new VarExp("v"))));
		runStatement(ex1);
	}

	private void runProgram2() throws ExpressionException, ADTException, StatementException, IOException {
		IStmt ex2 = new CompStmt(new VarDeclStmt("a",new IntType()),
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
						new CompStmt(new AssignStmt("a", new ValueExp(new BoolValue(true))),
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
		IDictionary<String, BufferedReader> fileTable = new MyDictionary<>();
		IHeap heap = new MyHeap();

		ProgramState state = new ProgramState(executionStack, symbolTable, output, fileTable, heap, statement);

		IRepository repository = new Repository(state, "log.txt");
		Controller controller = new Controller(repository);

		System.out.println("Do you want to display the steps?[Y/n]");
		Scanner readOption = new Scanner(System.in);
		String option = readOption.next();
		controller.setDisplayFlag(Objects.equals(option, "Y"));

		controller.allSteps();
		System.out.println("Result is" + state.getOut().toString().replace('[', ' ').replace(']', ' '));
	}

}