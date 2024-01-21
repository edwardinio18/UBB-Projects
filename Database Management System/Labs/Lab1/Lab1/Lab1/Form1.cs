using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace ChildrenToyManagementApp
{
	public partial class Form1 : Form
	{
		private DataSet dataSet;
		private SqlDataAdapter groupDataAdapter;
		private SqlDataAdapter childDataAdapter;
		private BindingSource groupBindingSource;
		private BindingSource childBindingSource;
		private SqlCommandBuilder childCommandBuilder;

		private const string connectionString = "Data Source=EDWARDIAKAB69AD;Initial Catalog=Toys;Integrated Security=True";

		public Form1()
		{
			InitializeComponent();
		}

		private void Form1_Load(object sender, EventArgs e)
		{
			// Create the DataSet and set up the DataAdapters
			dataSet = new DataSet();

			// Load the Groups data
			groupDataAdapter = new SqlDataAdapter("SELECT * FROM Groups", connectionString);
			groupDataAdapter.Fill(dataSet, "Groups");

			// Load the Children data
			childDataAdapter = new SqlDataAdapter("SELECT * FROM Children", connectionString);
			childDataAdapter.Fill(dataSet, "Children");

			// Set up the primary key for the Groups table
			dataSet.Tables["Groups"].PrimaryKey = new DataColumn[] { dataSet.Tables["Groups"].Columns["GroupId"] };

			// Set up the DataRelation between Groups and Children
			DataRelation relation = new DataRelation("GroupChildren",
				dataSet.Tables["Groups"].Columns["GroupId"],
				dataSet.Tables["Children"].Columns["GroupId"]);
			dataSet.Relations.Add(relation);

			// Set up the BindingSource for Groups
			groupBindingSource = new BindingSource(dataSet, "Groups");
			childBindingSource = new BindingSource(groupBindingSource, "GroupChildren");

			// Bind the DataGridViews to the BindingSources
			dgvGroups.DataSource = groupBindingSource;
			dgvChildren.DataSource = childBindingSource;

			// Create SqlCommandBuilder for Children
			childCommandBuilder = new SqlCommandBuilder(childDataAdapter);
		}

		private void btnSave_Click(object sender, EventArgs e)
		{
			// Save changes to the database
			try
			{
				// Update the changes made to Children in the DataSet
				childDataAdapter.Update(dataSet, "Children");

				// Refresh the data
				dataSet.Tables["Groups"].Clear();
				dataSet.Tables["Children"].Clear();
				groupDataAdapter.Fill(dataSet, "Groups");

				MessageBox.Show("Changes saved successfully.");
			}
			catch (Exception ex)
			{
				MessageBox.Show("Error occurred while saving changes: " + ex.Message);
			}
		}

		private void btnDeleteChild_Click(object sender, EventArgs e)
		{
			// Check if a child is selected
			if (dgvChildren.SelectedRows.Count > 0)
			{
				// Get the selected child's row
				DataGridViewRow selectedRow = dgvChildren.SelectedRows[0];

				// Get the child ID from the row's data
				int childId = Convert.ToInt32(selectedRow.Cells["ChildId"].Value);

				// Find the corresponding DataRow in the DataSet
				DataRow childRow = dataSet.Tables["Children"].Rows.Find(childId);

				if (childRow != null)
				{
					// Remove the child row from the DataSet
					childRow.Delete();

					// Save changes to the Children table
					childDataAdapter.Update(dataSet, "Children");

					// Refresh the DataGridView
					dataSet.Tables["Children"].AcceptChanges();
					childBindingSource.ResetBindings(false);
				}
			}
		}
	}
}