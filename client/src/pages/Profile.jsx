import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api.js";

const Profile = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    // Get profile
    useEffect(() => {
        const getProfile = async () => {
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(
                    `${apiUrl}/api/profile`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "Failed to fetch profile");
                    return;
                }

                setProfile(data.user);

                setFormData({
                    name: data.user.name || "",
                    email: data.user.email || "",
                });
            } catch (error) {
                setError("Unable to connect to server.");
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, [navigate, token]);

    // Input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Update profile
    const handleUpdate = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        try {
            setUpdating(true);

            const response = await fetch(
                `${apiUrl}/api/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to update profile");
                return;
            }

            setProfile(data.user);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user),
            );

            setMessage("Profile updated successfully.");
        } catch (error) {
            setError("Unable to connect to server.");
        } finally {
            setUpdating(false);
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    // Delete profile
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account?",
        );

        if (!confirmDelete) return;

        try {
            setDeleting(true);
            setError("");

            const response = await fetch(
                `${apiUrl}/api/profile`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to delete account");
                return;
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/");
        } catch (error) {
            setError("Unable to connect to server.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black text-white">
                <p className="text-white/60">Loading profile...</p>
            </main>
        );
    }

    if (error && !profile) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
                <div className="text-center">
                    <p className="mb-5 text-red-400">{error}</p>

                    <button
                        onClick={() => navigate("/login")}
                        className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
                    >
                        Go to Login
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black px-6 py-12 text-white">
            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-10 flex items-start justify-between gap-5">
                    <div>
                        <h1 className="text-3xl font-semibold">
                            My Profile
                        </h1>

                        <p className="mt-2 text-sm text-white/50">
                            Manage your account information.
                        </p>
                    </div>

                    {/* My Bookings */}
                    <button
                        type="button"
                        onClick={() => navigate("/my-bookings")}
                        className="rounded-full border border-white/20 px-5 py-2.5 text-sm transition hover:bg-white hover:text-black"
                    >
                        My Bookings
                    </button>
                </div>

                {message && (
                    <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Profile Form */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <form onSubmit={handleUpdate} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm text-white/80">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-white/15 bg-black px-4 py-3.5 text-sm outline-none focus:border-white/50"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm text-white/80">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-white/15 bg-black px-4 py-3.5 text-sm outline-none focus:border-white/50"
                            />
                        </div>

                        {/* Update */}
                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black disabled:opacity-50"
                        >
                            {updating ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>

                {/* Account Info */}
                <div className="mt-6 rounded-2xl border border-white/10 p-6">
                    <h2 className="mb-4 text-lg font-medium">
                        Account Information
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-white/50">
                                Verification
                            </span>

                            <span className="text-green-400">
                                {profile?.isVerified
                                    ? "Verified"
                                    : "Not Verified"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <div className="mt-6 rounded-2xl border border-white/10 p-6">
                    <h2 className="text-lg font-medium">
                        Account Actions
                    </h2>

                    <p className="mt-2 text-sm text-white/50">
                        Sign out from your Luxe Screens account.
                    </p>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-4 rounded-full border border-white/20 px-5 py-3 text-sm transition hover:bg-white hover:text-black"
                    >
                        Logout
                    </button>
                </div>

                {/* Delete */}
                <div className="mt-8 border-t border-white/10 pt-8">
                    <h2 className="text-lg font-medium text-red-400">
                        Delete Account
                    </h2>

                    <p className="mt-2 text-sm text-white/50">
                        This action cannot be undone.
                    </p>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="mt-4 rounded-full border border-red-500/40 px-5 py-3 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                    >
                        {deleting ? "Deleting..." : "Delete Account"}
                    </button>
                </div>

            </div>
        </main>
    );
};

export default Profile;