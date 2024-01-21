using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace A2
{
	public partial class Form1 : Form
	{
		private SqlConnection dbConnection;
		private SqlDataAdapter daParent, daChild;
		private DataSet tableData;
		private DataRelation drParentChild;
		private BindingSource bsParent, bsChild;

		public Form1()
		{
			InitializeComponent();
		}

		private string GetConnectionString()
		{
			return ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
		}

		private string GetParentTableName()
		{
			return ConfigurationManager.AppSettings["ParentTableName"];
		}

		private string GetChildTableName()
		{
			return ConfigurationManager.AppSettings["ChildTableName"];
		}

		private string GetParentSelectQuery()
		{
			return ConfigurationManager.AppSettings["ParentSelectQuery"];
		}

		private string GetChildSelectQuery()
		{
			return ConfigurationManager.AppSettings["ChildSelectQuery"];
		}

		private string GetParentReferencedKey()
		{
			return ConfigurationManager.AppSettings["ParentReferencedKey"];
		}

		private string GetChildForeignKey()
		{
			return ConfigurationManager.AppSettings["ChildForeignKey"];
		}

		private string GetParentSelectionQuery()
		{
			return ConfigurationManager.AppSettings["ParentSelectionQuery"];
		}

		private void Form1_Load(object sender, EventArgs e)
		{
			dbConnection = new SqlConnection(GetConnectionString());
			dbConnection.Open();

			tableData = new DataSet();

			daParent = new SqlDataAdapter(GetParentSelectQuery(), dbConnection);
			daParent.Fill(tableData, GetParentTableName());
			parentTableView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

			daChild = new SqlDataAdapter(GetChildSelectQuery(), dbConnection);

			// Add the parameter to the child select command
			string childSelectQuery = GetChildSelectQuery();
			SqlCommand childSelectCommand = new SqlCommand(childSelectQuery, dbConnection);
			childSelectCommand.Parameters.Add("@cID", SqlDbType.Int); // Add parameter for cID
			daChild.SelectCommand = childSelectCommand;

			daChild.SelectCommand.Parameters["@cID"].Value = DBNull.Value; // Set initial value to DBNull

			daChild.Fill(tableData, GetChildTableName());
			childTableView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

			DataColumn referenceId = tableData.Tables[GetParentTableName()].Columns[GetParentReferencedKey()];
			DataColumn foreignId = tableData.Tables[GetChildTableName()].Columns[GetChildForeignKey()];
			drParentChild = new DataRelation("FK_Parent_Child", referenceId, foreignId);
			tableData.Relations.Add(drParentChild);

			bsParent = new BindingSource();
			bsParent.DataSource = tableData;
			bsParent.DataMember = GetParentTableName();

			bsChild = new BindingSource();
			bsChild.DataSource = bsParent;
			bsChild.DataMember = "FK_Parent_Child";

			parentTableView.DataSource = bsParent;
		}

		private void parentTableView_SelectionChanged(object sender, EventArgs e)
		{
			if (parentTableView.SelectedRows.Count != 0)
			{
				DataGridViewRow selectedRow = parentTableView.SelectedRows[0];
				int cID = Convert.ToInt32(selectedRow.Cells[0].Value);
				daChild.SelectCommand.Parameters["@cID"].Value = cID;
				ReloadChildTableView();
			}
		}

		private void ReloadChildTableView()
		{
			if (tableData.Tables[GetChildTableName()] != null)
			{
				tableData.Tables[GetChildTableName()].Clear();
			}

			daChild.Fill(tableData, GetChildTableName());
			childTableView.DataSource = bsChild;
		}

		private void childTableView_DataError(object sender, DataGridViewDataErrorEventArgs e)
		{
			if (e.Exception is InvalidConstraintException)
			{
				MessageBox.Show("The parent id you provided does not exist!");
			}
			else if (e.Exception is FormatException)
			{
				MessageBox.Show(e.Exception.Message);
			}
			else
			{
				try
				{
					throw e.Exception;
				}
				catch (Exception ex)
				{
					MessageBox.Show(ex.ToString());
				}
			}
		}

		private void updateButton_Click(object sender, EventArgs e)
		{
			SqlCommandBuilder builder = new SqlCommandBuilder(daChild);
			daChild.UpdateCommand = builder.GetUpdateCommand();
			daChild.InsertCommand = builder.GetInsertCommand();
			daChild.DeleteCommand = builder.GetDeleteCommand();
			try
			{
				daChild.Update(tableData, GetChildTableName());
			}
			catch (SqlException sqlException)
			{
				if (sqlException.Number == 2627)
				{
					MessageBox.Show("There is column data that should be unique in the table!");
				}
				else if (sqlException.Number == 547)
				{
					MessageBox.Show("There's no parent with the given id!");
				}
				else
				{
					MessageBox.Show(sqlException.Message);
				}
			}
			ReloadChildTableView();
		}
	}
}
