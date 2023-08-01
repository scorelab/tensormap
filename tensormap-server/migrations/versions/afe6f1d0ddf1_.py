"""empty message

Revision ID: afe6f1d0ddf1
Revises: 8f6baba4a236
Create Date: 2023-07-20 23:13:17.852503

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'afe6f1d0ddf1'
down_revision = '8f6baba4a236'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('model_basic', sa.Column('training_split', sa.Float(), nullable=False))
    op.add_column('model_basic', sa.Column('optimizer', sa.String(length=50), nullable=False))
    op.add_column('model_basic', sa.Column('metric', sa.String(length=50), nullable=False))
    op.add_column('model_basic', sa.Column('epochs', sa.Integer(), nullable=False))
    op.create_unique_constraint(None, 'model_basic', ['model_name'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'model_basic', type_='unique')
    op.drop_column('model_basic', 'epochs')
    op.drop_column('model_basic', 'metric')
    op.drop_column('model_basic', 'optimizer')
    op.drop_column('model_basic', 'training_split')
    # ### end Alembic commands ###
