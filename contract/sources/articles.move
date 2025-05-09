module letsdyor::articles {
	use std::option;
	use std::object::{Object, Self};
	use std::string::{String, utf8};
	use std::signer;
	use std::ed25519;

	use aptos_framework::account::{SignerCapability, Self};
	use aptos_framework::resource_account;

	use aptos_token_objects::token;
	use aptos_token_objects::royalty::{Royalty};
	use aptos_token_objects::collection::{Collection, Self};

	use aptos_framework::event;

	const ENotWebsite: u64 = 0;

	struct State has key, store {
		collection_object: Object<Collection>,
		signerCap: SignerCapability
	}

	#[event]
	struct ArticleAdded has drop, store {
		creator: address,
		token_id: address
	}

	fun init_module(creator: &signer) {
		let signerCap = resource_account::retrieve_resource_account_cap(creator, @owner);

		let name = utf8(b"LetsDyor");
		let description = utf8(b"Those are web3 articles");
		let collection_uri = utf8(b"https://bronze-immense-hoverfly-659.mypinata.cloud/ipfs/QmZ7SJayhZcYN9o871UV8UyiGRbebYPFQPwTik1NKMJPJ7");

		collection::create_unlimited_collection(creator, description, name, option::none<Royalty>(), collection_uri);

		let collection_address = collection::create_collection_address(&signer::address_of(creator), &name);
		move_to<State>(creator, State {
			collection_object: object::address_to_object<Collection>(collection_address),
			signerCap,
		});
	}

	entry fun add_article(
		sender: &signer, 
		name: String, description: String,
		signature: vector<u8>, message: vector<u8>
	) acquires State {
		assert!(check_source(signature, message), ENotWebsite);

		let state: &State = borrow_global<State>(@letsdyor);
		let creator: &signer = &account::create_signer_with_capability(&state.signerCap);

		let collection_name = collection::name<Collection>(*&state.collection_object);

		let contructor_ref = token::create(
			creator, 
			collection_name, 
			description, 
			name, 
			option::none<Royalty>(), 
			utf8(b"None")
		);

		let token_id = object::address_from_constructor_ref(&contructor_ref);

		object::transfer_raw(creator, token_id, signer::address_of(sender));

		event::emit(ArticleAdded {
			creator: signer::address_of(sender),
			token_id
		});
	}

	fun check_source(signature_bytes: vector<u8>, message: vector<u8>): bool {
		let signature = ed25519::new_signature_from_bytes(signature_bytes);
		let public_key = ed25519::new_unvalidated_public_key_from_bytes(x"4d031dfec57633364efc929e652b438ad100e89319f89cb6754aa347e6e38e5c");

		ed25519::signature_verify_strict(&signature, &public_key, message)
	}

}