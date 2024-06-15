import React, { useState } from 'react';

import { useRouter } from 'next/router'; // Changed from 'next/navigation' to 'next/router'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface CustomizationDto {
  color: string;
  size: string;
  material: string;
}

interface CustomizeProductProps {
  _id: string;
  onClose: () => void;
}

const CustomizeProduct: React.FC<CustomizeProductProps> = ({ _id, onClose }) => {
  const [customization, setCustomization] = useState<CustomizationDto>({ color: '', size: '', material: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomization((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: string) => {
    setCustomization((prev) => ({ ...prev, color }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const response = await fetch(`http://localhost:8080/product/${_id}/customize`, { // Wrapped URL in backticks
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customization),
      });
      if (!response.ok) {

        throw new Error(`HTTP error! Status: ${response.status}`); // Wrapped message in backticks
      }
      onClose();
    } catch (error) {
      console.error('Customization error:', error);
      setError('Failed to customize product. Please try again later.');
    }
  };

  return (
    <Container className="customization-container mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <h1 className="customization-title">Customize Product</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <div className="color-swatches">
                {['Red', 'Blue', 'Green'].map((color) => (
                  <div
                    key={color}

                    className={`color-swatch ${color.toLowerCase()}`} // Wrapped class names in backticks
                    style={{
                      backgroundColor: color.toLowerCase(),
                      width: '30px',
                      height: '30px',
                      display: 'inline-block',
                      cursor: 'pointer',
                      margin: '0 5px',
                      border: customization.color === color ? '2px solid black' : '1px solid gray'
                    }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="size" className="mt-3">
              <Form.Label>Size</Form.Label>
              <Form.Control as="select" name="size" value={customization.size} onChange={handleChange}>
                <option value="">Select size</option>
                <option value="800 x 1200">800 x 1200</option>
                <option value="1000 x 1200">1000 x 1200</option>
                <option value="1067 x 1067">1067 x 1067</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="material" className="mt-3">
              <Form.Label>Material</Form.Label>
              <Form.Control type="text" name="material" value={customization.material} onChange={handleChange} />
            </Form.Group>
            <Button variant="custom" type="submit" className="mt-4">Save Customization</Button>
          </Form>
        </Col>
      </Row>

      <style jsx>{`
        .color-swatch {
          border-radius: 50%;
        }
        .color-swatch.red {
          background-color: red;
        }
        .color-swatch.blue {
          background-color: blue;
        }
        .color-swatch.green {
          background-color: green;
        }
      `}</style>
    </Container>
  );
};

export default CustomizeProduct;
