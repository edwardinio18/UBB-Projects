using System.Drawing;
using System.Windows.Forms;

namespace ChildrenToyManagementApp
{
	partial class Form1
	{
		private System.ComponentModel.IContainer components = null;

		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null))
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		private void InitializeComponent()
		{
			this.dgvGroups = new System.Windows.Forms.DataGridView();
			this.dgvChildren = new System.Windows.Forms.DataGridView();
			this.btnSave = new System.Windows.Forms.Button();
			this.btnDeleteChild = new System.Windows.Forms.Button();
			((System.ComponentModel.ISupportInitialize)(this.dgvGroups)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.dgvChildren)).BeginInit();
			this.SuspendLayout();
			// 
			// dgvGroups
			// 
			this.dgvGroups.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			this.dgvGroups.Location = new System.Drawing.Point(12, 12);
			this.dgvGroups.Margin = new System.Windows.Forms.Padding(4);
			this.dgvGroups.Name = "dgvGroups";
			this.dgvGroups.RowHeadersWidth = 51;
			this.dgvGroups.Size = new System.Drawing.Size(966, 185);
			this.dgvGroups.TabIndex = 0;
			// 
			// dgvChildren
			// 
			this.dgvChildren.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			this.dgvChildren.Location = new System.Drawing.Point(12, 207);
			this.dgvChildren.Margin = new System.Windows.Forms.Padding(4);
			this.dgvChildren.Name = "dgvChildren";
			this.dgvChildren.RowHeadersWidth = 51;
			this.dgvChildren.Size = new System.Drawing.Size(966, 185);
			this.dgvChildren.TabIndex = 1;
			// 
			// btnSave
			// 
			this.btnSave.Location = new System.Drawing.Point(12, 399);
			this.btnSave.Margin = new System.Windows.Forms.Padding(4);
			this.btnSave.Name = "btnSave";
			this.btnSave.Size = new System.Drawing.Size(100, 28);
			this.btnSave.TabIndex = 2;
			this.btnSave.Text = "Save";
			this.btnSave.UseVisualStyleBackColor = true;
			this.btnSave.Click += new System.EventHandler(this.btnSave_Click);
			// 
			// btnDeleteChild
			// 
			this.btnDeleteChild.Location = new System.Drawing.Point(123, 402);
			this.btnDeleteChild.Name = "btnDeleteChild";
			this.btnDeleteChild.Size = new System.Drawing.Size(75, 23);
			this.btnDeleteChild.TabIndex = 3;
			this.btnDeleteChild.Text = "Delete Child";
			this.btnDeleteChild.Click += new System.EventHandler(this.btnDeleteChild_Click);
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(995, 442);
			this.Controls.Add(this.btnDeleteChild);
			this.Controls.Add(this.btnSave);
			this.Controls.Add(this.dgvChildren);
			this.Controls.Add(this.dgvGroups);
			this.Margin = new System.Windows.Forms.Padding(4);
			this.Name = "Form1";
			this.Text = "Children Toy Management";
			this.Load += new System.EventHandler(this.Form1_Load);
			((System.ComponentModel.ISupportInitialize)(this.dgvGroups)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.dgvChildren)).EndInit();
			this.ResumeLayout(false);
		}

		private System.Windows.Forms.DataGridView dgvGroups;
		private System.Windows.Forms.DataGridView dgvChildren;
		private System.Windows.Forms.Button btnSave;
		private Button btnDeleteChild;
	}
}
