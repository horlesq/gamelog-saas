"use client";

import React from "react";
import { UpdateProvider, useUpdate } from "@/contexts/UpdateContext";
import UpdateConfirmationModal from "@/components/features/UpdateConfirmationModal";
import { ReactLenis } from "lenis/react";

function UpdateModalContainer() {
    const { showConfirmDialog, hideConfirmDialog, updateInfo, executeUpdate } =
        useUpdate();

    if (!updateInfo?.hasUpdate) return null;

    return (
        <UpdateConfirmationModal
            isOpen={showConfirmDialog}
            onClose={hideConfirmDialog}
            onConfirm={executeUpdate}
            updateInfo={updateInfo}
        />
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root>
            <UpdateProvider>
                {children}
                <UpdateModalContainer />
            </UpdateProvider>
        </ReactLenis>
    );
}
