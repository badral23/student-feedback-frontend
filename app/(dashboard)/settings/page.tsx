import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="@container/page flex flex-1 flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <Tabs defaultValue="account" className="gap-6">
        <div
          data-slot="dashboard-header"
          className="flex items-center justify-between"
        >
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="account" className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Make changes to your account here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="form-account" className="@container">
                <FieldGroup>
                  <Field>
                    <Label htmlFor="name">Name</Label>
                    <FieldControl>
                      <Input
                        id="name"
                        placeholder="First and last name"
                        required
                      />
                    </FieldControl>
                    <FieldDescription>
                      This is your public display name.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Label htmlFor="email">Email</Label>
                    <FieldControl>
                      <Input
                        id="email"
                        placeholder="you@example.com"
                        required
                      />
                    </FieldControl>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter className="border-t">
              <Button type="submit" form="form-account" variant="secondary">
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent
          value="security"
          className="grid gap-6 @3xl/page:grid-cols-2"
        >
          <Card className="@3xl/page:col-span-2">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Make changes to your security settings here.
              </CardDescription>
            </CardHeader>
            <CardContent className="@container">
              <form id="form-security">
                <FieldGroup>
                  <Field>
                    <Label htmlFor="current-password">Current Password</Label>
                    <FieldControl>
                      <Input
                        id="current-password"
                        placeholder="Current password"
                        required
                      />
                    </FieldControl>
                    <FieldDescription>
                      This is your current password.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Label htmlFor="new-password">New Password</Label>
                    <FieldControl>
                      <Input
                        id="new-password"
                        placeholder="New password"
                        required
                      />
                    </FieldControl>
                  </Field>
                  <Field>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <FieldControl>
                      <Input
                        id="confirm-password"
                        placeholder="Confirm password"
                      />
                    </FieldControl>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter className="border-t">
              <Button type="submit" form="form-security" variant="secondary">
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FieldGroup({ children }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className="@container/field-group flex max-w-4xl min-w-0 flex-col gap-8 @3xl:gap-6"
    >
      {children}
    </div>
  );
}

function Field({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field"
      className={cn(
        "grid auto-rows-min items-start gap-3 *:data-[slot=label]:col-start-1 *:data-[slot=label]:row-start-1 @3xl/field-group:grid-cols-2 @3xl/field-group:gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function FieldControl({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-control"
      className={cn(
        "@3xl/field-group:col-start-2 @3xl/field-group:row-span-2 @3xl/field-group:row-start-1 @3xl/field-group:self-start",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function FieldDescription({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm @3xl/field-group:col-start-1 @3xl/field-group:row-start-1 @3xl/field-group:translate-y-6",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
