package View;

import Controller.Controller;
import Domain.Expression.*;
import Domain.ProgramState.ProgramState;
import Domain.Statement.*;
import Domain.Type.BoolType;
import Domain.Type.IntType;
import Domain.Type.RefType;
import Domain.Type.StringType;
import Domain.Utilities.MyDictionary;
import Domain.Utilities.MyHeap;
import Domain.Utilities.MyList;
import Domain.Utilities.MyStack;
import Domain.Value.BoolValue;
import Domain.Value.IntValue;
import Domain.Value.StringValue;
import Repository.IRepository;
import Repository.Repository;

import java.io.IOException;

public class Interpreter {
	public static void main(String[] args){
		IStmt ex1 = new CompStmt(new VarDeclStmt("v", new IntType()),
				new CompStmt(new AssignStmt("v", new ValueExp(new IntValue(2))),
						new PrintStmt(new VarExp("v"))));
		ProgramState prg1 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex1);
		IRepository repo1 = new Repository(prg1, "log1.txt");
		Controller controller1 = new Controller(repo1);

		IStmt ex2 = new CompStmt(new VarDeclStmt("a",new IntType()),
				new CompStmt(new VarDeclStmt("b",new IntType()),
						new CompStmt(new AssignStmt("a", new ArithExp('+',new ValueExp(new IntValue(2)),new
								ArithExp('*',new ValueExp(new IntValue(3)), new ValueExp(new IntValue(5))))),
								new CompStmt(new AssignStmt("b",new ArithExp('+',new VarExp("a"), new ValueExp(new
										IntValue(1)))), new PrintStmt(new VarExp("b"))))));
		ProgramState prg2 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex2);
		IRepository repo2 = new Repository(prg2, "log2.txt");
		Controller controller2 = new Controller(repo2);

		IStmt ex3 = new CompStmt(new VarDeclStmt("a", new BoolType()),
				new CompStmt(new VarDeclStmt("v", new IntType()),
						new CompStmt(new AssignStmt("a", new ValueExp(new BoolValue(true))),
								new CompStmt(new IfStmt(new VarExp("a"),
										new AssignStmt("v", new ValueExp(new IntValue(2))),
										new AssignStmt("v", new ValueExp(new IntValue(3)))),
										new PrintStmt(new VarExp("v"))))));
		ProgramState prg3 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex3);
		IRepository repo3 = new Repository(prg3, "log3.txt");
		Controller controller3 = new Controller(repo3);

		IStmt ex4 = new CompStmt(new VarDeclStmt("varf", new StringType()),
				new CompStmt(new AssignStmt("varf", new ValueExp(new StringValue("test.in"))),
						new CompStmt(new OpenReadFile(new VarExp("varf")),
								new CompStmt(new VarDeclStmt("varc", new IntType()),
										new CompStmt(new ReadFile(new VarExp("varf"), "varc"),
												new CompStmt(new PrintStmt(new VarExp("varc")),
														new CompStmt(new ReadFile(new VarExp("varf"), "varc"),
																new CompStmt(new PrintStmt(new VarExp("varc")),
																		new CloseReadFile(new VarExp("varf"))))))))));

		ProgramState prg4 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex4);
		IRepository repo4 = new Repository(prg4, "log4.txt");
		Controller controller4 = new Controller(repo4);

		IStmt ex5 = new CompStmt(new VarDeclStmt("a", new IntType()),
				new CompStmt(new VarDeclStmt("b", new IntType()),
						new CompStmt(new AssignStmt("a", new ValueExp(new IntValue(5))),
								new CompStmt(new AssignStmt("b", new ValueExp(new IntValue(7))),
										new IfStmt(new RelExp(">", new VarExp("a"),
												new VarExp("b")),new PrintStmt(new VarExp("a")),
												new PrintStmt(new VarExp("b")))))));

		ProgramState prg5 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex5);
		IRepository repo5 = new Repository(prg5, "log5.txt");
		Controller controller5 = new Controller(repo5);

		IStmt ex6 = new CompStmt(new VarDeclStmt("v", new IntType()),
				new CompStmt(new AssignStmt("v", new ValueExp(new IntValue(4))),
						new CompStmt(new WhileStmt(new RelExp(">", new VarExp("v"), new ValueExp(new IntValue(0))),
								new CompStmt(new PrintStmt(new VarExp("v")), new AssignStmt("v",new ArithExp('-', new VarExp("v"), new ValueExp(new IntValue(1)))))),
								new PrintStmt(new VarExp("v")))));

		ProgramState prg6 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex6);
		IRepository repo6 = new Repository(prg6, "log6.txt");
		Controller controller6 = new Controller(repo6);

		IStmt ex7 = new CompStmt(new VarDeclStmt("v", new RefType(new IntType())),
				new CompStmt(new NewStmt("v", new ValueExp(new IntValue(20))),
						new CompStmt(new VarDeclStmt("a", new RefType(new RefType(new IntType()))),
								new CompStmt(new NewStmt("a", new VarExp("v")),
										new CompStmt(new PrintStmt(new VarExp("v")), new PrintStmt(new VarExp("a")))))));
		ProgramState prg7 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex7);
		IRepository repo7 = new Repository(prg7, "log7.txt");
		Controller controller7 = new Controller(repo7);

		IStmt ex8 = new CompStmt(new VarDeclStmt("v", new RefType(new IntType())),
				new CompStmt(new NewStmt("v", new ValueExp(new IntValue(20))),
						new CompStmt(new VarDeclStmt("a", new RefType(new RefType(new IntType()))),
								new CompStmt(new NewStmt("a", new VarExp("v")),
										new CompStmt(new PrintStmt(new ReadHeapExp(new VarExp("v"))),
												new PrintStmt(new ArithExp('+',new ReadHeapExp(new ReadHeapExp(new VarExp("a"))), new ValueExp(new IntValue(5)))))))));
		ProgramState prg8 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex8);
		IRepository repo8 = new Repository(prg8, "log8.txt");
		Controller controller8 = new Controller(repo8);

		IStmt ex9 = new CompStmt(new VarDeclStmt("v", new RefType(new IntType())),
				new CompStmt(new NewStmt("v", new ValueExp(new IntValue(20))),
						new CompStmt( new PrintStmt(new ReadHeapExp(new VarExp("v"))),
								new CompStmt(new WriteHeapStmt("v", new ValueExp(new IntValue(30))),
										new PrintStmt(new ArithExp('+', new ReadHeapExp(new VarExp("v")), new ValueExp(new IntValue(5))))))));
		ProgramState prg9 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex9);
		IRepository repo9 = new Repository(prg9, "log9.txt");
		Controller controller9 = new Controller(repo9);

		IStmt ex10 = new CompStmt(new VarDeclStmt("v", new RefType(new IntType())),
				new CompStmt(new NewStmt("v", new ValueExp(new IntValue(20))),
						new CompStmt(new VarDeclStmt("a", new RefType(new RefType(new IntType()))),
								new CompStmt(new NewStmt("a", new VarExp("v")),
										new CompStmt(new NewStmt("v", new ValueExp(new IntValue(30))),
												new PrintStmt(new ReadHeapExp(new ReadHeapExp(new VarExp("a")))))))));
		ProgramState prg10 = new ProgramState(new MyStack<>(), new MyDictionary<>(), new MyList<>(), new MyDictionary<>(), new MyHeap(), ex10);
		IRepository repo10 = new Repository(prg10, "log10.txt");
		Controller controller10 = new Controller(repo10);

		TextMenu menu = new TextMenu();
		menu.addCommand(new ExitCommand("0", "exit"));
		menu.addCommand(new RunExaCommand("1", ex1.toString(), controller1));
		menu.addCommand(new RunExaCommand("2", ex2.toString(), controller2));
		menu.addCommand(new RunExaCommand("3", ex3.toString(), controller3));
		menu.addCommand(new RunExaCommand("4", ex4.toString(), controller4));
		menu.addCommand(new RunExaCommand("5", ex5.toString(), controller5));
		menu.addCommand(new RunExaCommand("6", ex6.toString(), controller6));
		menu.addCommand(new RunExaCommand("7", ex7.toString(), controller7));
		menu.addCommand(new RunExaCommand("8", ex8.toString(), controller8));
		menu.addCommand(new RunExaCommand("9", ex9.toString(), controller9));
		menu.addCommand(new RunExaCommand("10", ex10.toString(), controller10));
		menu.show();
	}
}