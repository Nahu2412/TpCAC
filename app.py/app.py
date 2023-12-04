from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from stripe.checkout.session import create
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['MAIL_SERVER'] = 'your-mail-server'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email'
app.config['MAIL_PASSWORD'] = 'your-email-password'

db = SQLAlchemy(app)
mail = Mail(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(100), nullable=False)

@app.route('/')
def home():
    products = Product.query.all()
    return render_template('home.html', products=products)

@app.route('/product/<int:product_id>')
def product(product_id):
    product = Product.query.get(product_id)
    return render_template('product.html', product=product)

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    product_id = request.form.get('product_id')
    product = Product.query.get(product_id)

    try:
        create(
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': product.name,
                    },
                    'unit_amount': int(product.price * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=url_for('success', product_id=product_id),
            cancel_url=url_for('cancel'),
        )
    except Exception as e:
        print(e)
        return redirect(url_for('home'))

    return redirect(url_for('home'))

@app.route('/success/<int:product_id>')
def success(product_id):
    product = Product.query.get(product_id)
    msg = Message('New Sale', sender='your-email', recipients=['your-email'])
    msg.body = f'A customer has just bought the {product.name} for ${product.price}.'
    mail.send(msg)
    return render_template('success.html', product=product)

@app.route('/cancel')
def cancel():
    return render_template('cancel.html')

if __name__ == '__main__':
    app.run(debug=True)