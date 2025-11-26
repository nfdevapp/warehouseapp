import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


type Category = "ELECTRONICS" | "SPORT_EQUIPMENT" | "COSMETICS" | "CLOTHING";

export type Product = {
    id: string;
    name: string;
    barcode: string;
    description: string;
    quantity: number;
    category: Category;
};

const categoryLabels: Record<Category, string> = {
    ELECTRONICS: "Elektronik",
    SPORT_EQUIPMENT: "Sportartikel",
    COSMETICS: "Kosmetik",
    CLOTHING: "Kleidung"
};


export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!id) return;

        axios
            .get(`/api/productdetailpage/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(() => {
                setMessage("Produkt konnte nicht geladen werden.");
                setLoading(false);
            });
    }, [id]);


    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        if (!product) return;
        const { name, value } = e.target;

        // automatisch casten bei Kategorie
        const correctedValue =
            name === "category" ? (value as Category) : value;

        setProduct({
            ...product,
            [name]: correctedValue
        });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!product) return;

        axios
            .put(`/api/productdetailpage/${product.id}`, product)
            .then(() => {
                setMessage("Produkt erfolgreich aktualisiert!");
            })
            .catch(() => {
                setMessage("Fehler beim Aktualisieren des Produkts.");
            });
    }

    if (loading) return <p>Lade Produkt…</p>;
    if (!product) return <p>Produkt nicht gefunden.</p>;

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <h1>Produkt bearbeiten</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                <label>
                    Name:
                    <input
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Barcode:
                    <input
                        name="barcode"
                        value={product.barcode}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Beschreibung:
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Menge:
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Kategorie:
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    >
                        {Object.entries(categoryLabels).map(
                            ([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            )
                        )}
                    </select>
                </label>

                <button type="submit">Speichern</button>
            </form>
        </div>
    );
}
