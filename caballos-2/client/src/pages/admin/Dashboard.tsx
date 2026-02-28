import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FaPalette, FaList } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-2">
            Welcome to the admin panel. Manage your horse coats and categories.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaPalette className="mr-2 h-5 w-5 text-orange-600" />
                Manage Coats
              </CardTitle>
              <CardDescription>
                Add, edit, or remove horse coat colors and their genetic information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/coats">
                <Button className="w-full">Go to Coats</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaList className="mr-2 h-5 w-5 text-orange-600" />
                Manage Categories
              </CardTitle>
              <CardDescription>
                Organize coats into categories for better organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/coat-categories">
                <Button className="w-full">Go to Categories</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
