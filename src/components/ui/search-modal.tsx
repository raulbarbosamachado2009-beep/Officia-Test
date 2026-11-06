import React from 'react';
import {
	Modal,
	ModalContent,
	ModalTitle,
	ModalTrigger,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import { LucideIcon, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CommandItem = {
	id: string;
	title: string;
	description: string;
	category: string;
	icon?: LucideIcon;
	shortcut?: string;
  onSelect?: () => void;
};

type SearchModalProps = {
	children: React.ReactNode;
	data: CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function SearchModal({ children, data, open: controlledOpen, onOpenChange }: SearchModalProps) {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const [query, setQuery] = React.useState('');

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsOpen(!isOpen);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, setIsOpen]);

	return (
		<Modal open={isOpen} onOpenChange={setIsOpen}>
			<ModalTrigger asChild>{children}</ModalTrigger>
			<ModalContent className="p-1 sm:max-w-xl bg-white dark:bg-[#13141a] border border-warm-mist shadow-2xl rounded-2xl overflow-hidden">
				<ModalTitle className="sr-only">Search</ModalTitle>
				<Command className="bg-transparent rounded-xl">
					<CommandInput
						className={cn(
							'placeholder:text-muted-foreground flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50 text-ink',
						)}
						placeholder="Digite para buscar comandos, setores ou ferramentas..."
						value={query}
						onValueChange={setQuery}
					/>
					<CommandList className="max-h-[380px] min-h-[260px] px-2 py-1">
						<CommandEmpty className="flex min-h-[220px] flex-col items-center justify-center text-center p-4">
							<SearchIcon className="text-muted-foreground mb-2 size-6 text-graphite" />
							<p className="text-muted-foreground mb-2 text-xs text-graphite">
								Nenhum comando encontrado para "{query}"
							</p>
							<Button onClick={() => setQuery('')} variant="ghost" className="text-xs text-deep-teal">
								Limpar busca
							</Button>
						</CommandEmpty>
						<CommandGroup heading="Ações & Navegação">
							{data.map((item) => {
								return (
									<CommandItem
										key={item.id}
										className="flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-soft-paper dark:hover:bg-[#1f222b] transition-colors"
										value={`${item.title} ${item.description} ${item.category}`}
										onSelect={() => {
                      if (item.onSelect) item.onSelect();
											setIsOpen(false);
										}}
									>
										{item.icon && <item.icon className="size-4.5 text-deep-teal shrink-0" />}
										<div className="flex flex-col min-w-0">
											<p className="max-w-[280px] sm:max-w-sm truncate text-sm font-medium text-ink">
												{item.title}
											</p>
											<p className="text-muted-foreground text-xs text-graphite truncate">
												{item.description}
											</p>
										</div>
										<span className="text-muted-foreground ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full bg-soft-paper border border-warm-mist/60 text-graphite shrink-0">
											{item.category}
										</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</ModalContent>
		</Modal>
	);
}

export default SearchModal;
