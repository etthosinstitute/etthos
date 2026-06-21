"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/shared/api-client";
import { formatPersonName, getErrorMessage } from "@/shared/utils";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  FileText,
  ClipboardCheck,
  Lock,
  User as UserIcon,
} from "lucide-react";

type DashboardData = {
  user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    role: "AUTHOR" | "REVIEWER" | "EDITOR" | "ADMIN" | "SUPER_ADMIN";
    isReviewer?: boolean;
  };
  author: {
    manuscripts: ManuscriptRecord[];
  };
  reviewer: {
    pendingAssignments: ReviewAssignmentRecord[];
    submittedReviews: SubmittedReviewRecord[];
  };
  editor: {
    manuscripts: ManuscriptRecord[];
    reviewers: ReviewerRecord[];
    auditLogs: AuditLogRecord[];
  };
};

type ReviewerRecord = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  role: string;
  isReviewer?: boolean;
};

type ManuscriptRecord = {
  id: string;
  title: string;
  abstract?: string | null;
  status: string;
  fileUrl?: string | null;
  publishedArticleId?: string | null;
  decisionNote?: string | null;
  keywords?: string[];
  updatedAt: string;
  createdAt: string;
  author: {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
  };
  assignments: ReviewAssignmentRecord[];
  reviews: SubmittedReviewRecord[];
};

type ReviewAssignmentRecord = {
  id: string;
  status: "ASSIGNED" | "ACCEPTED" | "DECLINED" | "SUBMITTED";
  invitedAt: string;
  dueDate?: string | null;
  submittedAt?: string | null;
  editorNotes?: string | null;
  reviewer?: ReviewerRecord;
  editor?: {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
  } | null;
  manuscript?: {
    id: string;
    title: string;
    status: string;
    fileUrl?: string | null;
    updatedAt?: string;
    author?: {
      firstName?: string | null;
      lastName?: string | null;
      email: string;
    };
  };
  review?: {
    id: string;
    decision: string;
    createdAt: string;
  } | null;
};

type SubmittedReviewRecord = {
  id: string;
  content?: string;
  decision: string;
  createdAt: string;
  manuscript: {
    id: string;
    title: string;
    status: string;
  };
  reviewer?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
  };
  assignment?: {
    id: string;
    status: string;
    submittedAt?: string | null;
  } | null;
};

type AuditLogRecord = {
  id: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  summary: string;
  createdAt: string;
  actor?: {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
  } | null;
};

type DashboardMessage = {
  tone: "success" | "error" | "info";
  text: string;
};

function formatDate(value?: string | null) {
  if (!value) return "Not set";
  return new Date(value).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function statusClasses(status: string) {
  if (status === "ACCEPTED" || status === "SUBMITTED") {
    return "border-emerald-600/20 bg-emerald-600/10 text-emerald-700";
  }
  if (status === "REJECTED" || status === "DECLINED") {
    return "border-red-600/20 bg-red-600/10 text-red-700";
  }
  if (
    status === "UNDER_REVIEW" ||
    status === "ASSIGNED" ||
    status === "ACCEPTED"
  ) {
    return "border-teal-700/20 bg-teal-700/10 text-teal-800";
  }
  return "border-border bg-accent/60 text-muted-foreground";
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState<DashboardMessage | null>(null);
  const [assignForms, setAssignForms] = useState<
    Record<string, { reviewerId: string; dueDate: string; editorNotes: string }>
  >({});
  const [reviewForms, setReviewForms] = useState<
    Record<
      string,
      { decision: string; content: string; confidentialComments: string }
    >
  >({});
  const [reviewerForm, setReviewerForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [publishForms, setPublishForms] = useState<
    Record<
      string,
      {
        articleTitle: string;
        articleType: string;
        volumeNumber: string;
        volumeYear: string;
        issueNumber: string;
        issueTitle: string;
        issueDescription: string;
        publishedDate: string;
        doi: string;
        pageStart: string;
        pageEnd: string;
      }
    >
  >({});
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
  });
  const [addFile, setAddFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const reviewerFormReady =
    reviewerForm.firstName.trim().length > 0 &&
    reviewerForm.lastName.trim().length > 0 &&
    reviewerForm.email.trim().length > 0;
  const passwordFormReady =
    passwordForm.currentPassword.trim().length > 0 &&
    passwordForm.newPassword.trim().length >= 8 &&
    passwordForm.confirmPassword.trim().length >= 8 &&
    passwordForm.newPassword === passwordForm.confirmPassword;

  async function loadDashboard() {
    try {
      setLoading(true);
      const response = await apiRequest<DashboardData>("/api/dashboard");
      setData(response);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load dashboard"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function handleDeleteManuscript(manuscriptId: string) {
    if (
      !window.confirm(
        "Are you sure you want to delete this manuscript? This action cannot be undone and will delete all reviews and assignments.",
      )
    ) {
      return;
    }
    try {
      setBusyKey(`delete-${manuscriptId}`);
      setMessage(null);
      await apiRequest(`/api/manuscripts/${manuscriptId}`, "DELETE");
      setMessage({
        tone: "success",
        text: "Manuscript successfully deleted.",
      });
      await loadDashboard();
    } catch (err) {
      setMessage({
        tone: "error",
        text: getErrorMessage(err, "Failed to delete manuscript"),
      });
    } finally {
      setBusyKey(null);
    }
  }

  async function handleAddManuscript(e: React.FormEvent) {
    e.preventDefault();
    if (!addForm.title.trim()) {
      setMessage({ tone: "info", text: "Title is required." });
      return;
    }
    try {
      setBusyKey("add-manuscript");
      setMessage(null);

      let fileUrl = "";
      if (addFile) {
        const uploadForm = new FormData();
        uploadForm.append("file", addFile);
        const uploadResponse = await fetch("/api/uploads/manuscript", {
          method: "POST",
          body: uploadForm,
        });
        const uploadJson = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(uploadJson.error || "Failed to upload file");
        }
        fileUrl = uploadJson.file.url;
      }

      const keywordsArray = addForm.keywords
        ? addForm.keywords
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k.length > 0)
        : [];

      await apiRequest("/api/manuscripts", "POST", {
        title: addForm.title.trim(),
        abstract: addForm.abstract.trim() || undefined,
        keywords: keywordsArray,
        fileUrl: fileUrl || undefined,
      });

      setMessage({ tone: "success", text: "Manuscript successfully added." });
      setAddForm({ title: "", abstract: "", keywords: "" });
      setAddFile(null);
      setShowAddForm(false);
      await loadDashboard();
    } catch (err) {
      setMessage({
        tone: "error",
        text: getErrorMessage(err, "Failed to add manuscript"),
      });
    } finally {
      setBusyKey(null);
    }
  }

  async function handleAssign(manuscriptId: string) {
    const form = assignForms[manuscriptId];
    if (!form?.reviewerId) {
      setMessage({ tone: "info", text: "Select a reviewer before assigning." });
      return;
    }

    try {
      setBusyKey(`assign-${manuscriptId}`);
      setMessage(null);
      const payload: Record<string, string> = {
        reviewerId: form.reviewerId,
      };
      if (form.dueDate) {
        payload.dueDate = new Date(form.dueDate).toISOString();
      }
      if (form.editorNotes) {
        payload.editorNotes = form.editorNotes;
      }
      const response = await apiRequest<{
        emailSent?: boolean;
        emailError?: string | null;
      }>(`/api/manuscripts/${manuscriptId}/assign`, "POST", payload);
      setMessage({
        tone: response.emailSent ? "success" : "info",
        text: response.emailSent
          ? "Reviewer assigned and invitation email sent."
          : `Reviewer assigned${response.emailError ? `, but email failed: ${response.emailError}` : "."}`,
      });
      await loadDashboard();
    } catch (err) {
      setMessage({
        tone: "error",
        text: getErrorMessage(err, "Failed to assign reviewer"),
      });
    } finally {
      setBusyKey(null);
    }
  }

  async function handleAssignmentResponse(
    assignmentId: string,
    status: "ACCEPTED" | "DECLINED",
  ) {
    try {
      setBusyKey(`respond-${assignmentId}-${status}`);
      setMessage(null);
      const response = await apiRequest<{
        emailSent?: boolean;
        emailError?: string | null;
      }>(`/api/review-assignments/${assignmentId}/respond`, "POST", { status });
      setMessage({
        tone: response.emailSent ? "success" : "info",
        text: response.emailSent
          ? `Invitation ${status.toLowerCase()} and editorial mailbox notified.`
          : `Invitation ${status.toLowerCase()}${response.emailError ? `, but email failed: ${response.emailError}` : "."}`,
      });
      await loadDashboard();
    } catch (err) {
      setMessage({
        tone: "error",
        text: getErrorMessage(err, "Failed to update assignment"),
      });
    } finally {
      setBusyKey(null);
    }
  }

  async function handleSubmitReview(
    assignmentId: string,
    manuscriptId: string,
  ) {
    const form = reviewForms[assignmentId];
    const trimmedContent = form?.content?.trim() || "";

    if (!form?.decision || trimmedContent.length < 10) {
      setMessage({
        tone: "info",
        text: "Review comments must be at least 10 characters and include a decision.",
      });
      return;
    }

    try {
      setBusyKey(`review-${assignmentId}`);
      setMessage(null);
      const response = await apiRequest<{
        emailSent?: boolean;
        emailError?: string | null;
      }>("/api/reviews", "POST", {
        assignmentId,
        manuscriptId,
        decision: form.decision,
        content: trimmedContent,
        confidentialComments: form.confidentialComments,
      });
      setMessage({
        tone: response.emailSent ? "success" : "info",
        text: response.emailSent
          ? "Review submitted and forwarded to the editorial inbox."
          : `Review saved${response.emailError ? `, but email failed: ${response.emailError}` : "."}`,
      });
      await loadDashboard();
    } catch (err) {
      setMessage({
        tone: "error",
        text: getErrorMessage(err, "Failed to submit review"),
      });
    } finally {
      setBusyKey(null);
    }
  }

  async function handleCreateReviewer() {
    if (
      !reviewerForm.firstName ||
      !reviewerForm.lastName ||
      !reviewerForm.email
    ) {
      setMessage({
        tone: "info",
        text: "Fill in the reviewer name and email before creating the account.",
      });
      return;
    }

    try {
      setBusyKey("create-reviewer");
      setMessage(null);
      const response = await apiRequest<{
        tempPassword?: string;
        emailSent?: boolean;
        emailError?: string | null;
        action: "created" | "promoted";
      }>("/api/reviewers", "POST", reviewerForm);

      setReviewerForm({
        firstName: "",
        lastName: "",
        email: "",
      });

      setMessage({
        tone: response.emailSent ? "success" : "info",
        text:
          response.action === "promoted"
            ? response.emailSent
              ? "Reviewer access enabled on the existing author account and the login email was sent."
              : `Reviewer access enabled on the existing author account${response.emailError ? `, but email failed: ${response.emailError}` : "."}`
            : response.emailSent
              ? `Reviewer account created and credentials emailed. Temporary password: ${response.tempPassword}`
              : `Reviewer account created. Temporary password: ${response.tempPassword}${response.emailError ? `, but email failed: ${response.emailError}` : ""}`,
      });
      await loadDashboard();
    } catch (err) {
      setMessage({
        tone: "error",
        text: getErrorMessage(err, "Failed to create reviewer"),
      });
    } finally {
      setBusyKey(null);
    }
  }

  async function handlePublish(manuscript: ManuscriptRecord) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const form = publishForms[manuscript.id] || {
      articleTitle: manuscript.title,
      articleType: "RESEARCH_ARTICLE",
      volumeNumber: "1",
      volumeYear: String(new Date().getFullYear()),
      issueNumber: "1",
      issueTitle: "",
      issueDescription: "",
      publishedDate: currentDate,
      doi: "",
      pageStart: "",
      pageEnd: "",
    };

    try {
      setBusyKey(`publish-${manuscript.id}`);
      setMessage(null);
      const response = await apiRequest<{
        message: string;
        article: { slug: string; title: string };
        issue: { volume: number; issue: number };
      }>(`/api/manuscripts/${manuscript.id}/publish`, "POST", {
        articleTitle: form.articleTitle || manuscript.title,
        articleType: form.articleType,
        volumeNumber: Number(form.volumeNumber),
        volumeYear: Number(form.volumeYear),
        issueNumber: Number(form.issueNumber),
        issueTitle: form.issueTitle,
        issueDescription: form.issueDescription,
        publishedDate: new Date(
          form.publishedDate || currentDate,
        ).toISOString(),
        doi: form.doi || undefined,
        pageStart: form.pageStart ? Number(form.pageStart) : undefined,
        pageEnd: form.pageEnd ? Number(form.pageEnd) : undefined,
      });

      setMessage({
        tone: "success",
        text: `${response.message} ${response.article.title} is now live in Volume ${response.issue.volume}, Issue ${response.issue.issue}.`,
      });
      await loadDashboard();
    } catch (err) {
      setMessage({
        tone: "error",
        text: getErrorMessage(err, "Failed to publish manuscript"),
      });
    } finally {
      setBusyKey(null);
    }
  }

  async function handleChangePassword() {
    if (!passwordFormReady) {
      setMessage({
        tone: "info",
        text: "Enter your current password and a new password of at least 8 characters.",
      });
      return;
    }

    try {
      setBusyKey("change-password");
      setMessage(null);
      const response = await apiRequest<{ message: string }>(
        "/api/auth/change-password",
        "POST",
        passwordForm,
      );
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setMessage({ tone: "success", text: response.message });
    } catch (err) {
      setMessage({
        tone: "error",
        text: getErrorMessage(err, "Failed to change password"),
      });
    } finally {
      setBusyKey(null);
    }
  }

  return (
    <>
      <PageHeader
        title="Journal Dashboard"
        description="Track submissions, assign reviewers, and manage review decisions in one place."
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {loading ? (
          <Card className="border-border/80 bg-[hsl(var(--paper)/0.84)] backdrop-blur-md">
            <CardContent className="py-16 text-center text-muted-foreground flex flex-col items-center justify-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <span>Loading your dashboard...</span>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="border-destructive/20 bg-destructive/5 backdrop-blur-md">
            <CardContent className="py-12 text-center">
              <p className="text-destructive font-medium">{error}</p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/auth/login">Log in</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : data ? (
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Sidebar Navigation */}
            <aside className="space-y-6">
              {/* User Profile Card in Sidebar */}
              <div className="rounded-[1.5rem] border border-border/80 bg-[hsl(var(--paper)/0.85)] p-5 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-serif text-lg font-bold text-primary truncate">
                      {formatPersonName(data.user)}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">{data.user.email}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex rounded-md bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary">
                    {data.user.role}
                  </span>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="flex overflow-x-auto gap-2 pb-2 lg:pb-0 lg:overflow-x-visible lg:flex-col lg:space-y-1.5 scrollbar-thin">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                    activeTab === "overview"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <LayoutDashboard className="h-4.5 w-4.5 shrink-0" />
                  <span>Overview</span>
                </button>

                {/* Submissions tab (for authors, editors, admins) */}
                <button
                  onClick={() => setActiveTab("submissions")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                    activeTab === "submissions"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <FileText className="h-4.5 w-4.5 shrink-0" />
                  <span>My Submissions</span>
                </button>

                {/* Review Tasks (for reviewers, editors, admins) */}
                {(data.user.role === "REVIEWER" ||
                  data.user.isReviewer ||
                  ["EDITOR", "ADMIN", "SUPER_ADMIN"].includes(data.user.role)) && (
                  <button
                    onClick={() => setActiveTab("reviewer-workspace")}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                      activeTab === "reviewer-workspace"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <ClipboardCheck className="h-4.5 w-4.5 shrink-0" />
                    <span>Review Tasks</span>
                  </button>
                )}

                {/* Editorial Queue (for editors, admins) */}
                {["EDITOR", "ADMIN", "SUPER_ADMIN"].includes(data.user.role) && (
                  <button
                    onClick={() => setActiveTab("editorial-queue")}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                      activeTab === "editorial-queue"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <ClipboardList className="h-4.5 w-4.5 shrink-0" />
                    <span>Editorial Board</span>
                  </button>
                )}

                {/* Reviewer Management (for editors, admins) */}
                {["EDITOR", "ADMIN", "SUPER_ADMIN"].includes(data.user.role) && (
                  <button
                    onClick={() => setActiveTab("reviewer-directory")}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                      activeTab === "reviewer-directory"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <Users className="h-4.5 w-4.5 shrink-0" />
                    <span>Manage Reviewers</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                    activeTab === "security"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <Lock className="h-4.5 w-4.5 shrink-0" />
                  <span>Account Security</span>
                </button>
              </nav>
            </aside>

            {/* Main Content Pane */}
            <main className="space-y-6">
              {message && (
                <div
                  className={`rounded-2xl border px-4 py-3.5 text-sm backdrop-blur-md shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
                    message.tone === "success"
                      ? "border-emerald-600/20 bg-emerald-600/5 text-emerald-800"
                      : message.tone === "error"
                        ? "border-destructive/20 bg-destructive/5 text-destructive"
                        : "border-secondary/20 bg-secondary/5 text-secondary"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Summary Cards Row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-[1.5rem] border border-border/80 bg-[hsl(var(--paper)/0.85)] p-6 backdrop-blur-md shadow-sm">
                      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground font-sans">
                        Your Submissions
                      </p>
                      <p className="mt-2 text-4xl font-serif font-bold text-primary">
                        {data.author.manuscripts.length}
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-border/80 bg-[hsl(var(--paper)/0.85)] p-6 backdrop-blur-md shadow-sm">
                      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground font-sans">
                        Pending Reviews
                      </p>
                      <p className="mt-2 text-4xl font-serif font-bold text-primary">
                        {data.reviewer.pendingAssignments.length}
                      </p>
                    </div>
                    {["EDITOR", "ADMIN", "SUPER_ADMIN"].includes(data.user.role) && (
                      <div className="rounded-[1.5rem] border border-border/80 bg-[hsl(var(--paper)/0.85)] p-6 backdrop-blur-md shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground font-sans">
                          Editorial Queue
                        </p>
                        <p className="mt-2 text-4xl font-serif font-bold text-primary">
                          {data.editor.manuscripts.length}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Profile info block */}
                  <Card className="journal-shell">
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl text-primary">Welcome Back</CardTitle>
                      <CardDescription>
                        You are logged in as {data.user.role.toLowerCase()}. Access your publications, review assignments, and settings from the left navigation panel.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 rounded-2xl border border-border/60 bg-muted/30 p-5 text-sm md:grid-cols-2">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground font-sans">First Name</p>
                          <p className="mt-1 font-semibold text-primary">{data.user.firstName || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Last Name</p>
                          <p className="mt-1 font-semibold text-primary">{data.user.lastName || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Email Address</p>
                          <p className="mt-1 font-semibold text-primary">{data.user.email}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Account Role</p>
                          <p className="mt-1 font-semibold text-primary">{data.user.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Editorial Activity Log (For Editors/Admins) */}
                  {["EDITOR", "ADMIN", "SUPER_ADMIN"].includes(data.user.role) && (
                    <Card className="journal-shell">
                      <CardHeader>
                        <CardTitle className="font-serif text-2xl text-primary">
                          Recent Activity Log
                        </CardTitle>
                        <CardDescription>
                          A running record of editorial and reviewer actions.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {data.editor.auditLogs.length === 0 ? (
                          <div className="journal-panel border-dashed p-6 text-sm text-muted-foreground">
                            No audit activity recorded yet.
                          </div>
                        ) : (
                          data.editor.auditLogs.slice(0, 10).map((entry) => (
                            <div key={entry.id} className="journal-panel p-4">
                              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                <div>
                                  <p className="text-sm font-medium text-primary">
                                    {entry.summary}
                                  </p>
                                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground font-sans">
                                    {entry.action.replaceAll("_", " ")} •{" "}
                                    {entry.entityType.replaceAll("_", " ")}
                                  </p>
                                  <p className="mt-2 text-sm text-muted-foreground text-xs font-sans">
                                    {entry.actor
                                      ? `By ${formatPersonName(entry.actor)}`
                                      : "System action"}{" "}
                                    • {formatDate(entry.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* TAB 2: MY SUBMISSIONS */}
              {activeTab === "submissions" && (
                <Card className="journal-shell">
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="font-serif text-2xl text-primary">
                        Author Submissions
                      </CardTitle>
                      <CardDescription>
                        Track and manage your submitted manuscripts.
                      </CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/submit">Submit New Manuscript</Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.author.manuscripts.length === 0 ? (
                      <div className="journal-panel border-dashed p-6 text-sm text-muted-foreground text-center">
                        No manuscripts submitted yet.{" "}
                        <Link
                          href="/submit"
                          className="text-secondary font-semibold hover:underline"
                        >
                          Submit your first manuscript here
                        </Link>
                        .
                      </div>
                    ) : (
                      data.author.manuscripts.map((manuscript) => (
                        <div key={manuscript.id} className="journal-panel p-5">
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <h3 className="font-serif text-2xl text-primary">
                                {manuscript.title}
                              </h3>
                              <p className="mt-2 text-sm text-muted-foreground">
                                Updated {formatDate(manuscript.updatedAt)}
                              </p>
                            </div>
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] h-fit ${statusClasses(manuscript.status)}`}
                            >
                              {manuscript.status.replaceAll("_", " ")}
                            </span>
                          </div>
                          {manuscript.abstract && (
                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                              {manuscript.abstract}
                            </p>
                          )}
                          {manuscript.assignments.length > 0 && (
                            <div className="mt-4 grid gap-3">
                              {manuscript.assignments.map((assignment) => (
                                <div
                                  key={assignment.id}
                                  className="rounded-xl border border-border/80 bg-card p-4 text-sm"
                                >
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="font-medium text-primary">
                                      Reviewer:{" "}
                                      {formatPersonName(assignment.reviewer)}
                                    </span>
                                    <span
                                      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusClasses(assignment.status)}`}
                                    >
                                      {assignment.status.replaceAll("_", " ")}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-muted-foreground">
                                    Invited {formatDate(assignment.invitedAt)} •
                                    Due {formatDate(assignment.dueDate)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              )}

              {/* TAB 3: REVIEWER WORKSPACE */}
              {activeTab === "reviewer-workspace" && (
                <div className="space-y-6">
                  <Card className="journal-shell">
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl text-primary">
                        Review Tasks & Invitations
                      </CardTitle>
                      <CardDescription>
                        Accept or decline pending invitations, read manuscripts, and submit reviews.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {data.reviewer.pendingAssignments.length === 0 ? (
                        <div className="journal-panel border-dashed p-6 text-sm text-muted-foreground text-center">
                          No active review tasks or invitations right now.
                        </div>
                      ) : (
                        data.reviewer.pendingAssignments.map((assignment) => {
                          const currentForm = reviewForms[assignment.id] || {
                            decision: "MINOR_REVISIONS",
                            content: "",
                            confidentialComments: "",
                          };
                          const reviewCommentCount =
                            currentForm.content.trim().length;
                          const reviewReady =
                            reviewCommentCount >= 10 && !!currentForm.decision;

                          return (
                            <div key={assignment.id} className="journal-panel p-5">
                              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                <div>
                                  <h3 className="font-serif text-2xl text-primary">
                                    {assignment.manuscript?.title}
                                  </h3>
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    Assigned by{" "}
                                    {formatPersonName(assignment.editor)} • Due{" "}
                                    {formatDate(assignment.dueDate)}
                                  </p>
                                </div>
                                <span
                                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] h-fit ${statusClasses(assignment.status)}`}
                                >
                                  {assignment.status.replaceAll("_", " ")}
                                </span>
                              </div>

                              <div className="mt-4 flex flex-wrap gap-3">
                                {assignment.status === "ASSIGNED" ? (
                                  <>
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={() =>
                                        handleAssignmentResponse(
                                          assignment.id,
                                          "ACCEPTED",
                                        )
                                      }
                                      disabled={
                                        busyKey ===
                                        `respond-${assignment.id}-ACCEPTED`
                                      }
                                    >
                                      {busyKey ===
                                      `respond-${assignment.id}-ACCEPTED`
                                        ? "Accepting..."
                                        : "Accept Invitation"}
                                    </Button>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="outline"
                                      className="text-destructive border-destructive/20 hover:bg-destructive/5"
                                      onClick={() =>
                                        handleAssignmentResponse(
                                          assignment.id,
                                          "DECLINED",
                                        )
                                      }
                                      disabled={
                                        busyKey ===
                                        `respond-${assignment.id}-DECLINED`
                                      }
                                    >
                                      {busyKey ===
                                      `respond-${assignment.id}-DECLINED`
                                        ? "Saving..."
                                        : "Decline"}
                                    </Button>
                                  </>
                                ) : null}

                                {assignment.manuscript?.fileUrl ? (
                                  <Button
                                    asChild
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                  >
                                    <a
                                      href={assignment.manuscript.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View Manuscript File
                                    </a>
                                  </Button>
                                ) : (
                                  <p className="text-sm text-muted-foreground">
                                    Manuscript file is not available yet.
                                  </p>
                                )}
                              </div>

                              {assignment.status === "ACCEPTED" ? (
                                <div className="mt-5 grid gap-4 border-t border-border/40 pt-4">
                                  <div>
                                    <label className="mb-2 block text-sm font-medium text-primary">
                                      Decision Recommendation
                                    </label>
                                    <select
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                                      value={currentForm.decision}
                                      onChange={(e) =>
                                        setReviewForms((prev) => ({
                                          ...prev,
                                          [assignment.id]: {
                                            ...currentForm,
                                            decision: e.target.value,
                                          },
                                        }))
                                      }
                                    >
                                      <option value="ACCEPT">Accept</option>
                                      <option value="MINOR_REVISIONS">
                                        Minor revisions
                                      </option>
                                      <option value="MAJOR_REVISIONS">
                                        Major revisions
                                      </option>
                                      <option value="REJECT">Reject</option>
                                    </select>
                                  </div>
                                  <div>
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                      <label className="block text-sm font-medium text-primary">
                                        Review comments
                                      </label>
                                      <span className="text-xs text-muted-foreground">
                                        {reviewCommentCount}/10 minimum
                                      </span>
                                    </div>
                                    <Textarea
                                      rows={6}
                                      value={currentForm.content}
                                      onChange={(e) =>
                                        setReviewForms((prev) => ({
                                          ...prev,
                                          [assignment.id]: {
                                            ...currentForm,
                                            content: e.target.value,
                                          },
                                        }))
                                      }
                                      placeholder="Write the comments that should accompany this review."
                                    />
                                    <p className="mt-2 text-xs text-muted-foreground font-sans">
                                      Add at least 10 characters so the editorial
                                      office receives a meaningful review note.
                                    </p>
                                  </div>
                                  <div>
                                    <label className="mb-2 block text-sm font-medium text-primary">
                                      Confidential comments for editors
                                    </label>
                                    <Textarea
                                      rows={4}
                                      value={currentForm.confidentialComments}
                                      onChange={(e) =>
                                        setReviewForms((prev) => ({
                                          ...prev,
                                          [assignment.id]: {
                                            ...currentForm,
                                            confidentialComments: e.target.value,
                                          },
                                        }))
                                      }
                                      placeholder="Optional notes visible only to the editorial office."
                                    />
                                  </div>
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      handleSubmitReview(
                                        assignment.id,
                                        assignment.manuscript!.id,
                                      )
                                    }
                                    disabled={
                                      busyKey === `review-${assignment.id}` ||
                                      !reviewReady
                                    }
                                  >
                                    {busyKey === `review-${assignment.id}`
                                      ? "Submitting..."
                                      : "Submit Review"}
                                  </Button>
                                  {!reviewReady ? (
                                    <p className="text-xs text-muted-foreground">
                                      Select a decision and enter at least 10
                                      characters before submitting.
                                    </p>
                                  ) : null}
                                </div>
                              ) : assignment.status === "SUBMITTED" ? (
                                <div className="mt-5 rounded-xl border border-emerald-600/15 bg-emerald-600/5 px-4 py-3 text-sm text-emerald-800">
                                  Your review has already been submitted and
                                  recorded.
                                </div>
                              ) : assignment.status === "DECLINED" ? (
                                <div className="mt-5 rounded-xl border border-red-600/15 bg-red-600/5 px-4 py-3 text-sm text-red-700">
                                  This invitation was declined, so the review form
                                  is no longer available.
                                </div>
                              ) : (
                                <div className="mt-5 rounded-xl border border-border/80 bg-card px-4 py-3 text-sm text-muted-foreground">
                                  Accept the invitation to unlock the review form.
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </CardContent>
                  </Card>

                  {data.reviewer.submittedReviews.length > 0 && (
                    <Card className="journal-shell">
                      <CardHeader>
                        <CardTitle className="font-serif text-xl text-primary">
                          Submitted Reviews
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {data.reviewer.submittedReviews.map((review) => (
                          <div
                            key={review.id}
                            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-sm md:flex-row md:items-center md:justify-between"
                          >
                            <div>
                              <p className="font-medium text-primary">
                                {review.manuscript.title}
                              </p>
                              <p className="text-muted-foreground text-xs mt-1">
                                Submitted {formatDate(review.createdAt)}
                              </p>
                            </div>
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] h-fit ${statusClasses(review.decision)}`}
                            >
                              {review.decision.replaceAll("_", " ")}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* TAB 4: EDITORIAL BOARD */}
              {activeTab === "editorial-queue" && (
                <Card className="journal-shell">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl text-primary">
                      Editorial Assignment Board
                    </CardTitle>
                    <CardDescription>
                      Assign reviewers, monitor review status, and publish accepted manuscripts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Add Manuscript Button & Form */}
                    <div className="mb-6">
                      <Button
                        type="button"
                        onClick={() => setShowAddForm(!showAddForm)}
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        {showAddForm
                          ? "Cancel Add Manuscript"
                          : "Add New Manuscript"}
                      </Button>

                      {showAddForm && (
                        <form
                          onSubmit={handleAddManuscript}
                          className="mt-4 rounded-[1.5rem] border border-border/80 bg-[hsl(var(--paper)/0.84)] p-6 space-y-4 shadow-sm"
                        >
                          <h4 className="font-serif text-xl text-primary font-semibold">
                            Submit a New Manuscript (as Editor)
                          </h4>
                          <div>
                            <label className="mb-1 block text-sm font-semibold text-primary font-medium">
                              Manuscript Title
                            </label>
                            <Input
                              type="text"
                              required
                              value={addForm.title}
                              onChange={(e) =>
                                setAddForm({
                                  ...addForm,
                                  title: e.target.value,
                                })
                              }
                              placeholder="Enter manuscript title"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-semibold text-primary font-medium">
                              Abstract (Optional)
                            </label>
                            <Textarea
                              rows={4}
                              value={addForm.abstract}
                              onChange={(e) =>
                                setAddForm({
                                  ...addForm,
                                  abstract: e.target.value,
                                })
                              }
                              placeholder="Provide a summary of the research..."
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-semibold text-primary font-medium">
                              Keywords (Comma-separated, Optional)
                            </label>
                            <Input
                              type="text"
                              value={addForm.keywords}
                              onChange={(e) =>
                                setAddForm({
                                  ...addForm,
                                  keywords: e.target.value,
                                })
                              }
                              placeholder="e.g. psychology, behavior, health"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-semibold text-primary font-medium">
                              Manuscript File (Optional)
                            </label>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={(e) =>
                                setAddFile(e.target.files?.[0] || null)
                              }
                            />
                            {addFile && (
                              <p className="mt-1 text-xs text-muted-foreground font-sans">
                                Selected: {addFile.name}
                              </p>
                            )}
                          </div>

                          <Button
                            type="submit"
                            disabled={
                              busyKey === "add-manuscript" ||
                              !addForm.title.trim()
                            }
                          >
                            {busyKey === "add-manuscript"
                              ? "Submitting..."
                              : "Submit Manuscript"}
                          </Button>
                        </form>
                      )}
                    </div>

                    {data.editor.reviewers.length === 0 && (
                      <div className="journal-panel border-dashed p-6 text-sm text-muted-foreground text-center">
                        No reviewer accounts are available yet. Create users
                        with the <code>REVIEWER</code>, <code>EDITOR</code>, or{" "}
                        <code>ADMIN</code> role, or enable reviewer access on an
                        existing author account.
                      </div>
                    )}

                    <div className="space-y-6">
                      {data.editor.manuscripts.map((manuscript) => {
                        const assignForm = assignForms[manuscript.id] || {
                          reviewerId: "",
                          dueDate: "",
                          editorNotes: "",
                        };

                        return (
                          <div
                            key={manuscript.id}
                            className="rounded-[1.5rem] border border-border/80 bg-[hsl(var(--paper)/0.82)] p-6 shadow-[0_18px_45px_-42px_rgba(19,34,56,0.26)]"
                          >
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between font-sans">
                              <div>
                                <h3 className="font-serif text-2xl text-primary font-bold">
                                  {manuscript.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Author: {formatPersonName(manuscript.author)} •
                                  Status: {manuscript.status.replaceAll("_", " ")}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] h-fit ${statusClasses(manuscript.status)}`}
                                >
                                  {manuscript.status.replaceAll("_", " ")}
                                </span>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteManuscript(manuscript.id)
                                  }
                                  disabled={busyKey === `delete-${manuscript.id}`}
                                >
                                  {busyKey === `delete-${manuscript.id}`
                                    ? "Deleting..."
                                    : "Delete"}
                                </Button>
                              </div>
                            </div>

                            {manuscript.assignments.length > 0 && (
                              <div className="mt-5 grid gap-3 md:grid-cols-2">
                                {manuscript.assignments.map((assignment) => (
                                  <div
                                    key={assignment.id}
                                    className="rounded-xl border border-border bg-card p-4 text-sm"
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="font-medium text-primary">
                                        {formatPersonName(assignment.reviewer)}
                                      </p>
                                      <span
                                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusClasses(assignment.status)}`}
                                      >
                                        {assignment.status.replaceAll("_", " ")}
                                      </span>
                                    </div>
                                    <p className="mt-2 text-muted-foreground text-xs font-sans">
                                      Invited {formatDate(assignment.invitedAt)} •
                                      Due {formatDate(assignment.dueDate)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] border-t border-border/40 pt-5">
                              <div className="grid gap-4">
                                <div>
                                  <label className="mb-2 block text-sm font-medium text-primary">
                                    Assign reviewer
                                  </label>
                                  <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                                    value={assignForm.reviewerId}
                                    onChange={(e) =>
                                      setAssignForms((prev) => ({
                                        ...prev,
                                        [manuscript.id]: {
                                          ...assignForm,
                                          reviewerId: e.target.value,
                                        },
                                      }))
                                    }
                                  >
                                    <option value="">Select reviewer</option>
                                    {data.editor.reviewers.map((reviewer) => (
                                      <option
                                        key={reviewer.id}
                                        value={reviewer.id}
                                      >
                                        {formatPersonName(reviewer)} (
                                        {reviewer.role})
                                      </option>
                                    ))}
                                  </select>
                                  <p className="mt-2 text-xs text-muted-foreground font-sans">
                                    Choose one reviewer account to send an
                                    invitation and due date.
                                  </p>
                                </div>
                                <div>
                                  <label className="mb-2 block text-sm font-medium text-primary">
                                    Editorial notes
                                  </label>
                                  <Textarea
                                    rows={4}
                                    value={assignForm.editorNotes}
                                    onChange={(e) =>
                                      setAssignForms((prev) => ({
                                        ...prev,
                                        [manuscript.id]: {
                                          ...assignForm,
                                          editorNotes: e.target.value,
                                        },
                                      }))
                                    }
                                    placeholder="Optional instructions to include with the assignment."
                                  />
                                  <p className="mt-2 text-xs text-muted-foreground font-sans">
                                    These notes are included with the reviewer
                                    invitation email.
                                  </p>
                                </div>
                              </div>
                              <div className="grid gap-4">
                                <div>
                                  <label className="mb-2 block text-sm font-medium text-primary">
                                    Due date
                                  </label>
                                  <Input
                                    type="date"
                                    value={assignForm.dueDate}
                                    onChange={(e) =>
                                      setAssignForms((prev) => ({
                                        ...prev,
                                        [manuscript.id]: {
                                          ...assignForm,
                                          dueDate: e.target.value,
                                        },
                                      }))
                                    }
                                  />
                                </div>
                                <Button
                                  type="button"
                                  className="mt-auto"
                                  onClick={() => handleAssign(manuscript.id)}
                                  disabled={
                                    busyKey === `assign-${manuscript.id}` ||
                                    data.editor.reviewers.length === 0 ||
                                    !assignForm.reviewerId
                                  }
                                >
                                  {busyKey === `assign-${manuscript.id}`
                                    ? "Assigning..."
                                    : "Assign Reviewer"}
                                </Button>
                                {!assignForm.reviewerId ? (
                                  <p className="text-xs text-muted-foreground font-sans">
                                    Select a reviewer to enable assignment.
                                  </p>
                                ) : null}
                              </div>
                            </div>

                            {manuscript.status === "ACCEPTED" &&
                              !manuscript.publishedArticleId && (
                                <div className="mt-6 rounded-[1.35rem] border border-secondary/20 bg-secondary/5 p-5">
                                  <div className="mb-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                                      Publication Workflow
                                    </p>
                                    <h4 className="mt-2 font-serif text-xl text-primary font-bold">
                                      Publish accepted manuscript to the journal
                                      archive
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground font-sans">
                                      This will create or reuse the selected
                                      volume and issue, generate a public article
                                      record, and move the manuscript into the
                                      published archive.
                                    </p>
                                  </div>

                                  {(() => {
                                    const form = publishForms[manuscript.id] || {
                                      articleTitle: manuscript.title,
                                      articleType: "RESEARCH_ARTICLE",
                                      volumeNumber: "1",
                                      volumeYear: String(
                                        new Date().getFullYear(),
                                      ),
                                      issueNumber: "1",
                                      issueTitle: "",
                                      issueDescription: "",
                                      publishedDate: new Date()
                                        .toISOString()
                                        .slice(0, 10),
                                      doi: "",
                                      pageStart: "",
                                      pageEnd: "",
                                    };

                                    return (
                                      <div className="grid gap-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary">
                                              Article title
                                            </label>
                                            <Input
                                              value={form.articleTitle}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    articleTitle: e.target.value,
                                                  },
                                                }))
                                              }
                                            />
                                            <p className="mt-2 text-xs text-muted-foreground font-sans">
                                              This is the public title that will
                                              appear in the issue archive.
                                            </p>
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary">
                                              Article type
                                            </label>
                                            <select
                                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                                              value={form.articleType}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    articleType: e.target.value,
                                                  },
                                                }))
                                              }
                                            >
                                              <option value="RESEARCH_ARTICLE">
                                                Research Article
                                              </option>
                                              <option value="REVIEW_ARTICLE">
                                                Review Article
                                              </option>
                                              <option value="CASE_STUDY">
                                                Case Study
                                              </option>
                                              <option value="SHORT_COMMUNICATION">
                                                Short Communication
                                              </option>
                                              <option value="EDITORIAL">
                                                Editorial
                                              </option>
                                              <option value="LETTER_TO_EDITOR">
                                                Letter to the Editor
                                              </option>
                                              <option value="BOOK_REVIEW">
                                                Book Review
                                              </option>
                                            </select>
                                          </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-4 font-sans">
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary">
                                              Volume
                                            </label>
                                            <Input
                                              type="number"
                                              min="1"
                                              value={form.volumeNumber}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    volumeNumber: e.target.value,
                                                  },
                                                }))
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary">
                                              Year
                                            </label>
                                            <Input
                                              type="number"
                                              min="1900"
                                              value={form.volumeYear}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    volumeYear: e.target.value,
                                                  },
                                                }))
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary">
                                              Issue
                                            </label>
                                            <Input
                                              type="number"
                                              min="1"
                                              value={form.issueNumber}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    issueNumber: e.target.value,
                                                  },
                                                }))
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary">
                                              Published date
                                            </label>
                                            <Input
                                              type="date"
                                              value={form.publishedDate}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    publishedDate: e.target.value,
                                                  },
                                                }))
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary font-semibold">
                                              Issue title
                                            </label>
                                            <Input
                                              value={form.issueTitle}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    issueTitle: e.target.value,
                                                  },
                                                }))
                                              }
                                              placeholder="Optional custom issue title"
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary font-semibold">
                                              DOI
                                            </label>
                                            <Input
                                              value={form.doi}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    doi: e.target.value,
                                                  },
                                                }))
                                              }
                                              placeholder="Optional DOI"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <label className="mb-2 block text-sm font-medium text-primary">
                                            Issue description
                                          </label>
                                          <Textarea
                                            rows={3}
                                            value={form.issueDescription}
                                            onChange={(e) =>
                                              setPublishForms((prev) => ({
                                                ...prev,
                                                [manuscript.id]: {
                                                  ...form,
                                                  issueDescription:
                                                    e.target.value,
                                                },
                                              }))
                                            }
                                            placeholder="Optional issue description for the archive page."
                                          />
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2 font-sans">
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary">
                                              Page start
                                            </label>
                                            <Input
                                              type="number"
                                              min="1"
                                              value={form.pageStart}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    pageStart: e.target.value,
                                                  },
                                                }))
                                              }
                                              placeholder="Optional"
                                            />
                                          </div>
                                          <div>
                                            <label className="mb-2 block text-sm font-medium text-primary">
                                              Page end
                                            </label>
                                            <Input
                                              type="number"
                                              min="1"
                                              value={form.pageEnd}
                                              onChange={(e) =>
                                                setPublishForms((prev) => ({
                                                  ...prev,
                                                  [manuscript.id]: {
                                                    ...form,
                                                    pageEnd: e.target.value,
                                                  },
                                                }))
                                              }
                                              placeholder="Optional"
                                            />
                                          </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                          <Button
                                            type="button"
                                            onClick={() =>
                                              handlePublish(manuscript)
                                            }
                                            disabled={
                                              busyKey ===
                                                `publish-${manuscript.id}` ||
                                              !form.articleTitle.trim()
                                            }
                                          >
                                            {busyKey ===
                                            `publish-${manuscript.id}`
                                              ? "Publishing..."
                                              : "Publish to Issue"}
                                          </Button>
                                          {manuscript.fileUrl ? (
                                            <Button
                                              asChild
                                              type="button"
                                              variant="outline"
                                            >
                                              <a
                                                href={manuscript.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                View Accepted File
                                              </a>
                                            </Button>
                                          ) : null}
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </div>
                              )}

                            {manuscript.status === "PUBLISHED" && (
                              <div className="mt-6 rounded-[1.25rem] border border-emerald-600/20 bg-emerald-600/8 px-4 py-3 text-sm text-emerald-800">
                                This manuscript is already published in the
                                journal archive.
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB 5: MANAGE REVIEWERS */}
              {activeTab === "reviewer-directory" && (
                <Card className="journal-shell">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl text-primary font-bold">
                      Reviewer Management
                    </CardTitle>
                    <CardDescription>
                      Create reviewer accounts, or enable reviewer access on existing author accounts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 rounded-[1.5rem] border border-border/80 bg-[hsl(var(--paper)/0.84)] p-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-primary">
                          First name
                        </label>
                        <Input
                          value={reviewerForm.firstName}
                          onChange={(e) =>
                            setReviewerForm((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          placeholder="Priyanka"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-primary">
                          Last name
                        </label>
                        <Input
                          value={reviewerForm.lastName}
                          onChange={(e) =>
                            setReviewerForm((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          placeholder="Verma"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-primary">
                          Official email
                        </label>
                        <Input
                          type="email"
                          value={reviewerForm.email}
                          onChange={(e) =>
                            setReviewerForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="reviewer@university.edu"
                        />
                        <p className="mt-2 text-xs text-muted-foreground font-sans">
                          If this email already belongs to an author account,
                          that account will keep author access and also gain
                          reviewer access.
                        </p>
                      </div>
                      <div className="md:col-span-2 flex items-end pt-2">
                        <Button
                          type="button"
                          className="w-full sm:w-auto"
                          onClick={handleCreateReviewer}
                          disabled={
                            busyKey === "create-reviewer" || !reviewerFormReady
                          }
                        >
                          {busyKey === "create-reviewer"
                            ? "Saving..."
                            : "Create or Convert Reviewer"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TAB 6: SECURITY */}
              {activeTab === "security" && (
                <Card className="journal-shell">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl text-primary">
                      Account Security
                    </CardTitle>
                    <CardDescription>
                      Update your password to secure your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 rounded-[1.5rem] border border-border/80 bg-[hsl(var(--paper)/0.84)] p-6 md:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-primary">
                          Current password
                        </label>
                        <Input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-primary">
                          New password
                        </label>
                        <Input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                        />
                        <p className="mt-2 text-xs text-muted-foreground font-sans">
                          Use at least 8 characters.
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-primary">
                          Confirm new password
                        </label>
                        <Input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                        />
                        {passwordForm.confirmPassword &&
                        passwordForm.newPassword !==
                          passwordForm.confirmPassword ? (
                          <p className="mt-2 text-xs text-destructive font-sans">
                            Password confirmation does not match.
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        onClick={handleChangePassword}
                        disabled={
                          busyKey === "change-password" || !passwordFormReady
                        }
                      >
                        {busyKey === "change-password"
                          ? "Updating..."
                          : "Change Password"}
                      </Button>
                      {!passwordFormReady ? (
                        <p className="text-xs text-muted-foreground font-sans">
                          Fill all password fields correctly before updating.
                        </p>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              )}
            </main>
          </div>
        ) : null}
      </div>
    </>
  );
}
